interface ImportMetaEnv {
  readonly VITE_API_URI: string;
  readonly VITE_LINK_WIDGET_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export type DefaultBundleApiParams = {
	/**
   * Flag to get hidden specification
   * @default false
   */
  hiddenSpecification?: boolean;
  /**
   * If true search only between mark as deleted bundles, if false search only between mark as not deleted bundles, if not provided search all bundles
   * @default false
   */
  isDeleted?: boolean;
  /**
   * If true search only between mark as active bundles, if false search only between mark as not active bundles, if not provided search all bundles
   * @default true
   */
  isEnabled?: boolean;
  /**
   * If true search only between mark as gift bundles, if false search only between mark as not gift bundles, if not provided search all bundles
   * @default false
   */
  isGift?: boolean;
  /** If true search only between mark as temporary unavailable bundles, if false search only between mark as not temporary unavailable bundles, if not provided search all bundles */
  isTemporaryUnavailable?: boolean;
  /** If true search only between mark as bundles in sales, if false search only between mark as not in sale bundles, if not provided search all bundles */
	isSaleOver?: boolean;
};

