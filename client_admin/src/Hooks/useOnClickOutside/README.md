# useOnClickOutside

This hook tracks if any mouse or touch event happened outside of given Element refs and runs callback function if any of them happend

### Usage example

```tsx
import React from 'react';

const ComponentWithDropdownMenu: React.FC = (): JSX.Element => {
  const [showDropdownMenu, setShowDropdownMenu] = React.useState<boolean>(false);
  const dropdownMenuBtnRef = React.useRef<HTMLDivElement>(null);
  const dropdownMenuRef = React.useRef<HTMLDivElement>(null);

  const handleOnToggleDropdownMenu = React.useCallback(() => {
    setShowDropdownMenu((showDropdownMenu) => !showDropdownMenu);
  }, []);

  const handleOnCloseDropdownMenu = React.useCallback(() => {
    setShowDropdownMenu(false);
  }, []);

  // If is clicked outside of these two refs, handleOnCloseDropdownMenu callback wil run
  useOnClickOutside([dropdownMenuBtnRef, dropdownMenuRef], handleOnCloseDropdownMenu);

  return (
    <>
      <div
        // If ref is not added here, dropdown menu would close due to click outside and reopen as expected on button click, or can be moved to theirs wrapper if it is possible
        ref={dropdownMenuBtnRef}
        onClick={handleOnToggleDropdownMenu}
      >
        Open Dropdown Menu
      </div>
      {showDropdownMenu && <div ref={dropdownMenuRef}>Dropdown menu</div>}
    </>
  );
};
```
