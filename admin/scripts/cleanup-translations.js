const fs = require('fs');
const path = require('path');
const glob = require('glob');

function getAllTranslationKeys(translationsPath) {
  const pattern = path.join(translationsPath, '*.json');
  const allKeys = new Set();

  glob.sync(pattern).forEach((file) => {
    const translations = JSON.parse(fs.readFileSync(file, 'utf8'));
    for (const key of Object.keys(translations)) {
      allKeys.add(key);
    }
  });

  return allKeys;
}

function isKeyUsed(srcPath, key) {
  const pattern = path.join(srcPath, '**/*.{js,jsx,ts,tsx}');
  const keyPattern = new RegExp(`['"\`]${key}['"\`]`);

  for (const file of glob.sync(pattern)) {
    const content = fs.readFileSync(file, 'utf8');
    if (keyPattern.test(content)) {
      return true;
    }
  }

  return false;
}

function getUnusedKeys(srcPath, allKeys) {
  const unusedKeys = new Set();

  for (const key of allKeys) {
    if (!isKeyUsed(srcPath, key)) {
      unusedKeys.add(key);
    }
  }

  return unusedKeys;
}

function cleanTranslationsFiles(translationsPath, unusedKeys) {
  const pattern = path.join(translationsPath, '*.json');

  glob.sync(pattern).forEach((file) => {
    const translations = JSON.parse(fs.readFileSync(file, 'utf8'));
    const updatedTranslations = {};

    for (const [key, value] of Object.entries(translations)) {
      if (!unusedKeys.has(key)) {
        updatedTranslations[key] = value;
      }
    }

    fs.writeFileSync(
      file,
      JSON.stringify(updatedTranslations, null, 2),
      'utf8'
    );
  });
}

function main() {
  const srcPath = path.join(__dirname, '..', 'src');
  const translationsPath = path.join(
    srcPath,
    'Services',
    'LocalizationService',
    'translations'
  );

  const allKeys = getAllTranslationKeys(translationsPath);
  const unusedKeys = getUnusedKeys(srcPath, allKeys);
  cleanTranslationsFiles(translationsPath, unusedKeys);
}

main();
