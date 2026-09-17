/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Error {
  data?: object | object[] | null;
  error: {
    status?: number;
    name?: string;
    message?: string;
    details?: object;
  };
}

export interface BundleNoteRequest {
  data: {
    noteId?: string;
    /** @format email */
    userEmail?: string;
    bundleId: string;
    note: string;
    registeredUser?: boolean;
    locale?: string;
    localizations?: (number | string)[];
  };
}

export interface BundleNoteListResponse {
  data?: BundleNote[];
  meta?: {
    pagination?: {
      page?: number;
      /** @min 25 */
      pageSize?: number;
      /** @max 1 */
      pageCount?: number;
      total?: number;
    };
  };
}

export interface BundleNote {
  id?: number;
  documentId?: string;
  noteId?: string;
  /** @format email */
  userEmail?: string;
  bundleId: string;
  note: string;
  registeredUser?: boolean;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /** @format date-time */
  publishedAt?: string;
  createdBy?: {
    id?: number;
    documentId?: string;
    firstname?: string;
    lastname?: string;
    username?: string;
    /** @format email */
    email?: string;
    resetPasswordToken?: string;
    registrationToken?: string;
    isActive?: boolean;
    roles?: {
      id?: number;
      documentId?: string;
      name?: string;
      code?: string;
      description?: string;
      users?: {
        id?: number;
        documentId?: string;
      }[];
      permissions?: {
        id?: number;
        documentId?: string;
        action?: string;
        actionParameters?: any;
        subject?: string;
        properties?: any;
        conditions?: any;
        role?: {
          id?: number;
          documentId?: string;
        };
        /** @format date-time */
        createdAt?: string;
        /** @format date-time */
        updatedAt?: string;
        /** @format date-time */
        publishedAt?: string;
        createdBy?: {
          id?: number;
          documentId?: string;
        };
        updatedBy?: {
          id?: number;
          documentId?: string;
        };
        locale?: string;
        localizations?: {
          id?: number;
          documentId?: string;
        }[];
      }[];
      /** @format date-time */
      createdAt?: string;
      /** @format date-time */
      updatedAt?: string;
      /** @format date-time */
      publishedAt?: string;
      createdBy?: {
        id?: number;
        documentId?: string;
      };
      updatedBy?: {
        id?: number;
        documentId?: string;
      };
      locale?: string;
      localizations?: {
        id?: number;
        documentId?: string;
      }[];
    }[];
    blocked?: boolean;
    preferedLanguage?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  };
  updatedBy?: {
    id?: number;
    documentId?: string;
  };
  locale?: string;
  localizations?: {
    id?: number;
    documentId?: string;
    noteId?: string;
    /** @format email */
    userEmail?: string;
    bundleId?: string;
    note?: string;
    registeredUser?: boolean;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  }[];
}

export interface BundleNoteResponse {
  data?: BundleNote;
  meta?: object;
}

export interface LandingRequest {
  data: {
    Title?: string;
    Description?: string;
    /** @example "string or id" */
    Social_media_image?: number | string;
    slug?: string;
    Content?: BaseNull &
      (
        | BaseNullComponentMapping<
            "header.competition-header",
            HeaderCompetitionHeaderComponent
          >
        | BaseNullComponentMapping<
            "header.producer-header",
            HeaderProducerHeaderComponent
          >
        | BaseNullComponentMapping<
            "content.dynamic-row",
            ContentDynamicRowComponent
          >
        | BaseNullComponentMapping<"content.faq", ContentFaqComponent>
        | BaseNullComponentMapping<
            "content.photogallery",
            ContentPhotogalleryComponent
          >
        | BaseNullComponentMapping<
            "content.youtube-video",
            ContentYoutubeVideoComponent
          >
        | BaseNullComponentMapping<
            "content.products-list",
            ContentProductsListComponent
          >
        | BaseNullComponentMapping<
            "content.products-by-category",
            ContentProductsByCategoryComponent
          >
        | BaseNullComponentMapping<
            "content.products-by-tag",
            ContentProductsByTagComponent
          >
        | BaseNullComponentMapping<"content.spacer", ContentSpacerComponent>
        | BaseNullComponentMapping<"content.cta", ContentCtaComponent>
        | BaseNullComponentMapping<
            "content.newsletter-form",
            ContentNewsletterFormComponent
          >
        | BaseNullComponentMapping<
            "header.vinisto-plus",
            HeaderVinistoPlusComponent
          >
      );
    Author?: string;
    /** @format date-time */
    Publication_date_from?: string;
    /** @format date-time */
    Publication_date_to?: string;
    Redirect_url?: string;
    Template_version?: string;
    Template?: string;
    Type: "competition" | "producer" | "content";
    OG_title?: string;
    OG_description?: string;
    locale?: string;
    localizations?: (number | string)[];
  };
}

export interface LandingListResponse {
  data?: Landing[];
  meta?: {
    pagination?: {
      page?: number;
      /** @min 25 */
      pageSize?: number;
      /** @max 1 */
      pageCount?: number;
      total?: number;
    };
  };
}

export interface Landing {
  id?: number;
  documentId?: string;
  Title?: string;
  Description?: string;
  Social_media_image?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    /** @format float */
    size?: number;
    url?: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    related?: {
      id?: number;
      documentId?: string;
    }[];
    folder?: {
      id?: number;
      documentId?: string;
      name?: string;
      pathId?: number;
      parent?: {
        id?: number;
        documentId?: string;
      };
      children?: {
        id?: number;
        documentId?: string;
      }[];
      files?: {
        id?: number;
        documentId?: string;
        name?: string;
        alternativeText?: string;
        caption?: string;
        width?: number;
        height?: number;
        formats?: any;
        hash?: string;
        ext?: string;
        mime?: string;
        /** @format float */
        size?: number;
        url?: string;
        previewUrl?: string;
        provider?: string;
        provider_metadata?: any;
        related?: {
          id?: number;
          documentId?: string;
        }[];
        folder?: {
          id?: number;
          documentId?: string;
        };
        folderPath?: string;
        /** @format date-time */
        createdAt?: string;
        /** @format date-time */
        updatedAt?: string;
        /** @format date-time */
        publishedAt?: string;
        createdBy?: {
          id?: number;
          documentId?: string;
          firstname?: string;
          lastname?: string;
          username?: string;
          /** @format email */
          email?: string;
          resetPasswordToken?: string;
          registrationToken?: string;
          isActive?: boolean;
          roles?: {
            id?: number;
            documentId?: string;
            name?: string;
            code?: string;
            description?: string;
            users?: {
              id?: number;
              documentId?: string;
            }[];
            permissions?: {
              id?: number;
              documentId?: string;
              action?: string;
              actionParameters?: any;
              subject?: string;
              properties?: any;
              conditions?: any;
              role?: {
                id?: number;
                documentId?: string;
              };
              /** @format date-time */
              createdAt?: string;
              /** @format date-time */
              updatedAt?: string;
              /** @format date-time */
              publishedAt?: string;
              createdBy?: {
                id?: number;
                documentId?: string;
              };
              updatedBy?: {
                id?: number;
                documentId?: string;
              };
              locale?: string;
              localizations?: {
                id?: number;
                documentId?: string;
              }[];
            }[];
            /** @format date-time */
            createdAt?: string;
            /** @format date-time */
            updatedAt?: string;
            /** @format date-time */
            publishedAt?: string;
            createdBy?: {
              id?: number;
              documentId?: string;
            };
            updatedBy?: {
              id?: number;
              documentId?: string;
            };
            locale?: string;
            localizations?: {
              id?: number;
              documentId?: string;
            }[];
          }[];
          blocked?: boolean;
          preferedLanguage?: string;
          /** @format date-time */
          createdAt?: string;
          /** @format date-time */
          updatedAt?: string;
          /** @format date-time */
          publishedAt?: string;
          createdBy?: {
            id?: number;
            documentId?: string;
          };
          updatedBy?: {
            id?: number;
            documentId?: string;
          };
          locale?: string;
          localizations?: {
            id?: number;
            documentId?: string;
          }[];
        };
        updatedBy?: {
          id?: number;
          documentId?: string;
        };
        locale?: string;
        localizations?: {
          id?: number;
          documentId?: string;
        }[];
      }[];
      path?: string;
      /** @format date-time */
      createdAt?: string;
      /** @format date-time */
      updatedAt?: string;
      /** @format date-time */
      publishedAt?: string;
      createdBy?: {
        id?: number;
        documentId?: string;
      };
      updatedBy?: {
        id?: number;
        documentId?: string;
      };
      locale?: string;
      localizations?: {
        id?: number;
        documentId?: string;
      }[];
    };
    folderPath?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  };
  slug?: string;
  Content?: AbstractNull &
    (
      | AbstractNullComponentMapping<
          "header.competition-header",
          HeaderCompetitionHeaderComponent
        >
      | AbstractNullComponentMapping<
          "header.producer-header",
          HeaderProducerHeaderComponent
        >
      | AbstractNullComponentMapping<
          "content.dynamic-row",
          ContentDynamicRowComponent
        >
      | AbstractNullComponentMapping<"content.faq", ContentFaqComponent>
      | AbstractNullComponentMapping<
          "content.photogallery",
          ContentPhotogalleryComponent
        >
      | AbstractNullComponentMapping<
          "content.youtube-video",
          ContentYoutubeVideoComponent
        >
      | AbstractNullComponentMapping<
          "content.products-list",
          ContentProductsListComponent
        >
      | AbstractNullComponentMapping<
          "content.products-by-category",
          ContentProductsByCategoryComponent
        >
      | AbstractNullComponentMapping<
          "content.products-by-tag",
          ContentProductsByTagComponent
        >
      | AbstractNullComponentMapping<"content.spacer", ContentSpacerComponent>
      | AbstractNullComponentMapping<"content.cta", ContentCtaComponent>
      | AbstractNullComponentMapping<
          "content.newsletter-form",
          ContentNewsletterFormComponent
        >
      | AbstractNullComponentMapping<
          "header.vinisto-plus",
          HeaderVinistoPlusComponent
        >
    );
  Author?: string;
  /** @format date-time */
  Publication_date_from?: string;
  /** @format date-time */
  Publication_date_to?: string;
  Redirect_url?: string;
  Template_version?: string;
  Template?: string;
  Type: "competition" | "producer" | "content";
  OG_title?: string;
  OG_description?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /** @format date-time */
  publishedAt?: string;
  createdBy?: {
    id?: number;
    documentId?: string;
  };
  updatedBy?: {
    id?: number;
    documentId?: string;
  };
  locale?: string;
  localizations?: {
    id?: number;
    documentId?: string;
    Title?: string;
    Description?: string;
    Social_media_image?: {
      id?: number;
      documentId?: string;
      name?: string;
      alternativeText?: string;
      caption?: string;
      width?: number;
      height?: number;
      formats?: any;
      hash?: string;
      ext?: string;
      mime?: string;
      /** @format float */
      size?: number;
      url?: string;
      previewUrl?: string;
      provider?: string;
      provider_metadata?: any;
      related?: {
        id?: number;
        documentId?: string;
      }[];
      folder?: {
        id?: number;
        documentId?: string;
      };
      folderPath?: string;
      /** @format date-time */
      createdAt?: string;
      /** @format date-time */
      updatedAt?: string;
      /** @format date-time */
      publishedAt?: string;
      createdBy?: {
        id?: number;
        documentId?: string;
      };
      updatedBy?: {
        id?: number;
        documentId?: string;
      };
      locale?: string;
      localizations?: {
        id?: number;
        documentId?: string;
      }[];
    };
    slug?: string;
    Content?: DiscriminatorNull &
      (
        | DiscriminatorNullComponentMapping<
            "header.competition-header",
            HeaderCompetitionHeaderComponent
          >
        | DiscriminatorNullComponentMapping<
            "header.producer-header",
            HeaderProducerHeaderComponent
          >
        | DiscriminatorNullComponentMapping<
            "content.dynamic-row",
            ContentDynamicRowComponent
          >
        | DiscriminatorNullComponentMapping<"content.faq", ContentFaqComponent>
        | DiscriminatorNullComponentMapping<
            "content.photogallery",
            ContentPhotogalleryComponent
          >
        | DiscriminatorNullComponentMapping<
            "content.youtube-video",
            ContentYoutubeVideoComponent
          >
        | DiscriminatorNullComponentMapping<
            "content.products-list",
            ContentProductsListComponent
          >
        | DiscriminatorNullComponentMapping<
            "content.products-by-category",
            ContentProductsByCategoryComponent
          >
        | DiscriminatorNullComponentMapping<
            "content.products-by-tag",
            ContentProductsByTagComponent
          >
        | DiscriminatorNullComponentMapping<
            "content.spacer",
            ContentSpacerComponent
          >
        | DiscriminatorNullComponentMapping<"content.cta", ContentCtaComponent>
        | DiscriminatorNullComponentMapping<
            "content.newsletter-form",
            ContentNewsletterFormComponent
          >
        | DiscriminatorNullComponentMapping<
            "header.vinisto-plus",
            HeaderVinistoPlusComponent
          >
      );
    Author?: string;
    /** @format date-time */
    Publication_date_from?: string;
    /** @format date-time */
    Publication_date_to?: string;
    Redirect_url?: string;
    Template_version?: string;
    Template?: string;
    Type?: "competition" | "producer" | "content";
    OG_title?: string;
    OG_description?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  }[];
}

export interface LandingResponse {
  data?: Landing;
  meta?: object;
}

export interface HeaderCompetitionHeaderComponent {
  id?: number;
  Background_image?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    /** @format float */
    size?: number;
    url?: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    related?: {
      id?: number;
      documentId?: string;
    }[];
    folder?: {
      id?: number;
      documentId?: string;
    };
    folderPath?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  };
  Text?: string;
}

export interface HeaderInfoBlockItemComponent {
  id?: number;
  Icon?:
    | "alcoholBottle"
    | "beer"
    | "bigAlcoholBattle"
    | "bottleAndPresent"
    | "bottleWithFlag"
    | "cheese"
    | "cheeseAndGlass"
    | "coffeeMug"
    | "contacts"
    | "fourBottles"
    | "grapes"
    | "grapesAndGlass"
    | "presentTips"
    | "searchWine"
    | "sellers"
    | "smallGrapes"
    | "sodaDrink"
    | "somelierHand"
    | "star"
    | "telephone"
    | "twoBottlesAndBeeerGlass"
    | "twoGlasses"
    | "voucher"
    | "wineBarrel"
    | "wineBottle"
    | "wineBottleWithLabel"
    | "winesBySugarContent"
    | "marketplace"
    | "area"
    | "client"
    | "delivery"
    | "foundation"
    | "members"
    | "recommendation"
    | "review";
  Value?: string;
  Title?: string;
}

export interface HeaderInfoBlockComponent {
  id?: number;
  Item?: HeaderInfoBlockItemComponent[];
}

export interface HeaderProducerHeaderComponent {
  id?: number;
  Section_name?: string;
  Logo?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    /** @format float */
    size?: number;
    url?: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    related?: {
      id?: number;
      documentId?: string;
    }[];
    folder?: {
      id?: number;
      documentId?: string;
    };
    folderPath?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  };
  Background_image?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    /** @format float */
    size?: number;
    url?: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    related?: {
      id?: number;
      documentId?: string;
    }[];
    folder?: {
      id?: number;
      documentId?: string;
    };
    folderPath?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  };
  Country?:
    | "CZ"
    | "SK"
    | "AT"
    | "DE"
    | "HU"
    | "IT"
    | "FR"
    | "ES"
    | "PT"
    | "ZA"
    | "AR"
    | "CL"
    | "GB"
    | "IE"
    | "MX"
    | "DO"
    | "PA"
    | "CU"
    | "GE"
    | "NZ"
    | "CARIBIC"
    | "SCOTLAND";
  Info_block?: HeaderInfoBlockComponent;
  Region_slug?: string;
  Region?: string;
}

export interface ContentYoutubeVideoComponent {
  id?: number;
  Youtube_src?: string;
}

export interface ContentTitleAndTextComponent {
  id?: number;
  Title?: string;
  Subtitle?: string;
  Text?: string;
  Show_read_more?: boolean;
}

export interface ContentImageComponent {
  id?: number;
  Image?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    /** @format float */
    size?: number;
    url?: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    related?: {
      id?: number;
      documentId?: string;
    }[];
    folder?: {
      id?: number;
      documentId?: string;
    };
    folderPath?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  };
}

export interface ContentSpacerComponent {
  id?: number;
  __component?: "content.spacer";
  Height?: number;
  Background_color?: "none" | "grey" | "beige" | "light pink";
}

export interface ContentCtaComponent {
  id?: number;
  __component?: "content.cta";
  Title?: string;
  Url?: string;
  Align?: "center" | "left" | "right";
}

export interface ContentDynamicColumnComponent {
  id?: number;
  content?: InternalNull &
    (
      | InternalNullComponentMapping<
          "content.youtube-video",
          ContentYoutubeVideoComponent
        >
      | InternalNullComponentMapping<
          "content.title-and-text",
          ContentTitleAndTextComponent
        >
      | InternalNullComponentMapping<"content.image", ContentImageComponent>
      | InternalNullComponentMapping<"content.spacer", ContentSpacerComponent>
      | InternalNullComponentMapping<"content.cta", ContentCtaComponent>
    );
  Background_color?: "none" | "grey" | "beige" | "light pink";
  Align?: "left" | "center" | "right" | "justify";
  Section_name?: string;
}

export interface ContentDynamicRowComponent {
  id?: number;
  __component?: "content.dynamic-row";
  Column?: ContentDynamicColumnComponent[];
  Section_name?: string;
}

export interface ContentFaqItemComponent {
  id?: number;
  Question?: string;
  Answer?: string;
  Answer_markdown?: string;
}

export interface ContentFaqComponent {
  id?: number;
  Title?: string;
  FAQ_items?: ContentFaqItemComponent[];
}

export interface ContentPhotogalleryComponent {
  id?: number;
  Photo?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    /** @format float */
    size?: number;
    url?: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    related?: {
      id?: number;
      documentId?: string;
    }[];
    folder?: {
      id?: number;
      documentId?: string;
    };
    folderPath?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  }[];
  Title?: string;
  Subtitle?: string;
  Style?: "strip" | "main image";
}

export interface ContentProductComponent {
  id?: number;
  Product_id?: string;
}

export interface ContentProductsListComponent {
  id?: number;
  Title?: string;
  Subtitle?: string;
  Product_card_style?: "fill width" | "half width" | "carousel";
  Show_all_products_link?: boolean;
  Products?: ContentProductComponent[];
}

export interface ContentProductsByCategoryComponent {
  id?: number;
  Title?: string;
  Description?: string;
  Category_id?: string;
  Sort_by_price?: "asc" | "desc";
}

export interface ContentProductsByTagComponent {
  id?: number;
  Title?: string;
  Description?: string;
  Tag_id?: string;
  Sort_by_price?: "asc" | "desc";
}

export interface ContentNewsletterFormComponent {
  id?: number;
  __component?: "content.newsletter-form";
  Title?: string;
  Description?: string;
  CTA?: string;
  Placeholder?: string;
}

export interface ContentMonthlySubscriptionComponent {
  id?: number;
  Title?: string;
  Subtitle?: string;
  Price?: string;
  Price_no_VAT?: string;
  CTA_title?: string;
}

export interface ContentYearlySubscriptionComponent {
  id?: number;
  Title?: string;
  Subtitle?: string;
  Price?: string;
  Price_no_VAT?: string;
  CTA_title?: string;
  Savings?: string;
  Price_note?: string;
}

export interface HeaderVinistoPlusComponent {
  id?: number;
  __component?: "header.vinisto-plus";
  Title?: string;
  Text?: string;
  Show_apply_coupon?: boolean;
  Info_block?: HeaderInfoBlockComponent;
  Monthly_subscription?: ContentMonthlySubscriptionComponent;
  Yearly_subscription?: ContentYearlySubscriptionComponent;
}

export interface PageRequest {
  data: {
    Type: "competition" | "producer";
    Producer_header?: HeaderProducerHeaderComponent;
    Title: string;
    Slug: string;
    Content?: ContentContentRowComponent[];
    Producer_slug: string;
    Competition_header?: HeaderCompetitionHeaderComponent;
    Description?: string;
    /** @example "string or id" */
    Social_media_image?: number | string;
    locale?: string;
    localizations?: (number | string)[];
  };
}

export interface PageListResponse {
  data?: Page[];
  meta?: {
    pagination?: {
      page?: number;
      /** @min 25 */
      pageSize?: number;
      /** @max 1 */
      pageCount?: number;
      total?: number;
    };
  };
}

export interface Page {
  id?: number;
  documentId?: string;
  Type: "competition" | "producer";
  Producer_header?: HeaderProducerHeaderComponent;
  Title: string;
  Slug: string;
  Content?: ContentContentRowComponent[];
  Producer_slug: string;
  Competition_header?: HeaderCompetitionHeaderComponent;
  Description?: string;
  Social_media_image?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    /** @format float */
    size?: number;
    url?: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    related?: {
      id?: number;
      documentId?: string;
    }[];
    folder?: {
      id?: number;
      documentId?: string;
    };
    folderPath?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  };
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /** @format date-time */
  publishedAt?: string;
  createdBy?: {
    id?: number;
    documentId?: string;
  };
  updatedBy?: {
    id?: number;
    documentId?: string;
  };
  locale?: string;
  localizations?: {
    id?: number;
    documentId?: string;
    Type?: "competition" | "producer";
    Producer_header?: HeaderProducerHeaderComponent;
    Title?: string;
    Slug?: string;
    Content?: ContentContentRowComponent[];
    Producer_slug?: string;
    Competition_header?: HeaderCompetitionHeaderComponent;
    Description?: string;
    Social_media_image?: {
      id?: number;
      documentId?: string;
      name?: string;
      alternativeText?: string;
      caption?: string;
      width?: number;
      height?: number;
      formats?: any;
      hash?: string;
      ext?: string;
      mime?: string;
      /** @format float */
      size?: number;
      url?: string;
      previewUrl?: string;
      provider?: string;
      provider_metadata?: any;
      related?: {
        id?: number;
        documentId?: string;
      }[];
      folder?: {
        id?: number;
        documentId?: string;
      };
      folderPath?: string;
      /** @format date-time */
      createdAt?: string;
      /** @format date-time */
      updatedAt?: string;
      /** @format date-time */
      publishedAt?: string;
      createdBy?: {
        id?: number;
        documentId?: string;
      };
      updatedBy?: {
        id?: number;
        documentId?: string;
      };
      locale?: string;
      localizations?: {
        id?: number;
        documentId?: string;
      }[];
    };
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  }[];
}

export interface PageResponse {
  data?: Page;
  meta?: object;
}

export interface ContentContentColumnComponent {
  id?: number;
  Title_and_text?: ContentTitleAndTextComponent;
  Image?: ContentImageComponent[];
  Align?: "left" | "center" | "right" | "justify";
  Youtube?: ContentYoutubeVideoComponent;
  Background_color?: "none" | "grey" | "beige" | "light pink";
}

export interface ContentContentRowComponent {
  id?: number;
  section_name?: string;
  Content_column?: ContentContentColumnComponent[];
  Photogallery?: ContentPhotogalleryComponent;
  products_list?: ContentProductsListComponent[];
  Youtube_video?: ContentYoutubeVideoComponent;
  faq?: ContentFaqComponent;
  products_by_category?: ContentProductsByCategoryComponent;
  products_by_tag?: ContentProductsByTagComponent;
}

export interface PromoRequest {
  data: {
    promoId?: string;
    Title: string;
    Banners: HeaderBannerComponent[];
    /** @example "string or id" */
    HeroImage?: number | string;
    PromoBlocks?: PromoBlockPromoBlockComponent[];
    templateId?: string;
    locale?: string;
    localizations?: (number | string)[];
  };
}

export interface PromoListResponse {
  data?: Promo[];
  meta?: {
    pagination?: {
      page?: number;
      /** @min 25 */
      pageSize?: number;
      /** @max 1 */
      pageCount?: number;
      total?: number;
    };
  };
}

export interface Promo {
  id?: number;
  documentId?: string;
  promoId?: string;
  Title: string;
  Banners: HeaderBannerComponent[];
  HeroImage?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    /** @format float */
    size?: number;
    url?: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    related?: {
      id?: number;
      documentId?: string;
    }[];
    folder?: {
      id?: number;
      documentId?: string;
    };
    folderPath?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  };
  PromoBlocks?: PromoBlockPromoBlockComponent[];
  templateId?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /** @format date-time */
  publishedAt?: string;
  createdBy?: {
    id?: number;
    documentId?: string;
  };
  updatedBy?: {
    id?: number;
    documentId?: string;
  };
  locale?: string;
  localizations?: {
    id?: number;
    documentId?: string;
    promoId?: string;
    Title?: string;
    Banners?: HeaderBannerComponent[];
    HeroImage?: {
      id?: number;
      documentId?: string;
      name?: string;
      alternativeText?: string;
      caption?: string;
      width?: number;
      height?: number;
      formats?: any;
      hash?: string;
      ext?: string;
      mime?: string;
      /** @format float */
      size?: number;
      url?: string;
      previewUrl?: string;
      provider?: string;
      provider_metadata?: any;
      related?: {
        id?: number;
        documentId?: string;
      }[];
      folder?: {
        id?: number;
        documentId?: string;
      };
      folderPath?: string;
      /** @format date-time */
      createdAt?: string;
      /** @format date-time */
      updatedAt?: string;
      /** @format date-time */
      publishedAt?: string;
      createdBy?: {
        id?: number;
        documentId?: string;
      };
      updatedBy?: {
        id?: number;
        documentId?: string;
      };
      locale?: string;
      localizations?: {
        id?: number;
        documentId?: string;
      }[];
    };
    PromoBlocks?: PromoBlockPromoBlockComponent[];
    templateId?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  }[];
}

export interface PromoResponse {
  data?: Promo;
  meta?: object;
}

export interface HeaderBannerComponent {
  id?: number;
  Icon?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    /** @format float */
    size?: number;
    url?: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    related?: {
      id?: number;
      documentId?: string;
    }[];
    folder?: {
      id?: number;
      documentId?: string;
    };
    folderPath?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  };
  Title?: string;
  Text?: string;
  Link?: string;
}

export interface PromoBlockCategoryLinkComponent {
  id?: number;
  Icon?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    /** @format float */
    size?: number;
    url?: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    related?: {
      id?: number;
      documentId?: string;
    }[];
    folder?: {
      id?: number;
      documentId?: string;
    };
    folderPath?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  };
  Title?: string;
  Link?: string;
}

export interface PromoBlockProductComponent {
  id?: number;
  Image?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    /** @format float */
    size?: number;
    url?: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    related?: {
      id?: number;
      documentId?: string;
    }[];
    folder?: {
      id?: number;
      documentId?: string;
    };
    folderPath?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  };
  Title?: string;
  Text?: string;
  Link?: string;
}

export interface PromoBlockPromoBlockComponent {
  id?: number;
  Title?: string;
  Image?: {
    id?: number;
    documentId?: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    /** @format float */
    size?: number;
    url?: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    related?: {
      id?: number;
      documentId?: string;
    }[];
    folder?: {
      id?: number;
      documentId?: string;
    };
    folderPath?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  };
  PromoText?: string;
  CategoryLinks?: PromoBlockCategoryLinkComponent[];
  Products?: PromoBlockProductComponent[];
}

export interface UploadFile {
  id?: number;
  name?: string;
  alternativeText?: string;
  caption?: string;
  /** @format integer */
  width?: number;
  /** @format integer */
  height?: number;
  formats?: number;
  hash?: string;
  ext?: string;
  mime?: string;
  /** @format double */
  size?: number;
  url?: string;
  previewUrl?: string;
  provider?: string;
  provider_metadata?: object;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface UsersPermissionsRole {
  id?: number;
  name?: string;
  description?: string;
  type?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface UsersPermissionsUser {
  /** @example 1 */
  id?: number;
  /** @example "foo.bar" */
  username?: string;
  /** @example "foo.bar@strapi.io" */
  email?: string;
  /** @example "local" */
  provider?: string;
  /** @example true */
  confirmed?: boolean;
  /** @example false */
  blocked?: boolean;
  /**
   * @format date-time
   * @example "2022-06-02T08:32:06.258Z"
   */
  createdAt?: string;
  /**
   * @format date-time
   * @example "2022-06-02T08:32:06.267Z"
   */
  updatedAt?: string;
}

export interface UsersPermissionsUserRegistration {
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" */
  jwt?: string;
  user?: UsersPermissionsUser;
}

export type UsersPermissionsPermissionsTree = Record<
  string,
  {
    /** every controller of the api */
    controllers?: Record<
      string,
      Record<
        string,
        {
          enabled?: boolean;
          policy?: string;
        }
      >
    >;
  }
>;

type BaseNull = (
  | HeaderCompetitionHeaderComponent
  | HeaderProducerHeaderComponent
  | ContentDynamicRowComponent
  | ContentFaqComponent
  | ContentPhotogalleryComponent
  | ContentYoutubeVideoComponent
  | ContentProductsListComponent
  | ContentProductsByCategoryComponent
  | ContentProductsByTagComponent
  | ContentSpacerComponent
  | ContentCtaComponent
  | ContentNewsletterFormComponent
  | HeaderVinistoPlusComponent
)[];

type BaseNullComponentMapping<Key, Type> = {
  __component: Key;
} & Type;

type AbstractNull = (
  | HeaderCompetitionHeaderComponent
  | HeaderProducerHeaderComponent
  | ContentDynamicRowComponent
  | ContentFaqComponent
  | ContentPhotogalleryComponent
  | ContentYoutubeVideoComponent
  | ContentProductsListComponent
  | ContentProductsByCategoryComponent
  | ContentProductsByTagComponent
  | ContentSpacerComponent
  | ContentCtaComponent
  | ContentNewsletterFormComponent
  | HeaderVinistoPlusComponent
)[];

type AbstractNullComponentMapping<Key, Type> = {
  __component: Key;
} & Type;

type DiscriminatorNull = (
  | HeaderCompetitionHeaderComponent
  | HeaderProducerHeaderComponent
  | ContentDynamicRowComponent
  | ContentFaqComponent
  | ContentPhotogalleryComponent
  | ContentYoutubeVideoComponent
  | ContentProductsListComponent
  | ContentProductsByCategoryComponent
  | ContentProductsByTagComponent
  | ContentSpacerComponent
  | ContentCtaComponent
  | ContentNewsletterFormComponent
  | HeaderVinistoPlusComponent
)[];

type DiscriminatorNullComponentMapping<Key, Type> = {
  __component: Key;
} & Type;

type InternalNull = (
  | ContentYoutubeVideoComponent
  | ContentTitleAndTextComponent
  | ContentImageComponent
  | ContentSpacerComponent
  | ContentCtaComponent
)[];

type InternalNullComponentMapping<Key, Type> = {
  __component: Key;
} & Type;

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:1338/api";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title DOCUMENTATION
 * @version 1.0.0
 * @license Apache 2.0 (https://www.apache.org/licenses/LICENSE-2.0.html)
 * @termsOfService YOUR_TERMS_OF_SERVICE_URL
 * @baseUrl http://localhost:1338/api
 * @externalDocs https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html
 * @contact TEAM <contact-email@something.io> (mywebsite.io)
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  bundleNotes = {
    /**
     * No description
     *
     * @tags Bundle-note
     * @name GetBundleNotes
     * @request GET:/bundle-notes
     * @secure
     */
    getBundleNotes: (
      query?: {
        /** Sort by attributes ascending (asc) or descending (desc) */
        sort?: string;
        /** Return page/pageSize (default: true) */
        "pagination[withCount]"?: boolean;
        /** Page number (default: 0) */
        "pagination[page]"?: number;
        /** Page size (default: 25) */
        "pagination[pageSize]"?: number;
        /** Offset value (default: 0) */
        "pagination[start]"?: number;
        /** Number of entities to return (default: 25) */
        "pagination[limit]"?: number;
        /** Fields to return (ex: title,author) */
        fields?: string;
        /** Relations to return */
        populate?: string;
        /** Filters to apply */
        filters?: Record<string, any>;
        /** Locale to apply */
        locale?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<BundleNoteListResponse, Error>({
        path: `/bundle-notes`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bundle-note
     * @name PostBundleNotes
     * @request POST:/bundle-notes
     * @secure
     */
    postBundleNotes: (data: BundleNoteRequest, params: RequestParams = {}) =>
      this.request<BundleNoteResponse, Error>({
        path: `/bundle-notes`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bundle-note
     * @name GetBundleNotesId
     * @request GET:/bundle-notes/{id}
     * @secure
     */
    getBundleNotesId: (id: number, params: RequestParams = {}) =>
      this.request<BundleNoteResponse, Error>({
        path: `/bundle-notes/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bundle-note
     * @name PutBundleNotesId
     * @request PUT:/bundle-notes/{id}
     * @secure
     */
    putBundleNotesId: (
      id: number,
      data: BundleNoteRequest,
      params: RequestParams = {},
    ) =>
      this.request<BundleNoteResponse, Error>({
        path: `/bundle-notes/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bundle-note
     * @name DeleteBundleNotesId
     * @request DELETE:/bundle-notes/{id}
     * @secure
     */
    deleteBundleNotesId: (id: number, params: RequestParams = {}) =>
      this.request<number, Error>({
        path: `/bundle-notes/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  landings = {
    /**
     * No description
     *
     * @tags Landing
     * @name GetLandings
     * @request GET:/landings
     * @secure
     */
    getLandings: (
      query?: {
        /** Sort by attributes ascending (asc) or descending (desc) */
        sort?: string;
        /** Return page/pageSize (default: true) */
        "pagination[withCount]"?: boolean;
        /** Page number (default: 0) */
        "pagination[page]"?: number;
        /** Page size (default: 25) */
        "pagination[pageSize]"?: number;
        /** Offset value (default: 0) */
        "pagination[start]"?: number;
        /** Number of entities to return (default: 25) */
        "pagination[limit]"?: number;
        /** Fields to return (ex: title,author) */
        fields?: string;
        /** Relations to return */
        populate?: string;
        /** Filters to apply */
        filters?: Record<string, any>;
        /** Locale to apply */
        locale?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<LandingListResponse, Error>({
        path: `/landings`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Landing
     * @name PostLandings
     * @request POST:/landings
     * @secure
     */
    postLandings: (data: LandingRequest, params: RequestParams = {}) =>
      this.request<LandingResponse, Error>({
        path: `/landings`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Landing
     * @name GetLandingsId
     * @request GET:/landings/{id}
     * @secure
     */
    getLandingsId: (id: number, params: RequestParams = {}) =>
      this.request<LandingResponse, Error>({
        path: `/landings/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Landing
     * @name PutLandingsId
     * @request PUT:/landings/{id}
     * @secure
     */
    putLandingsId: (
      id: number,
      data: LandingRequest,
      params: RequestParams = {},
    ) =>
      this.request<LandingResponse, Error>({
        path: `/landings/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Landing
     * @name DeleteLandingsId
     * @request DELETE:/landings/{id}
     * @secure
     */
    deleteLandingsId: (id: number, params: RequestParams = {}) =>
      this.request<number, Error>({
        path: `/landings/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  pages = {
    /**
     * No description
     *
     * @tags Page
     * @name GetPages
     * @request GET:/pages
     * @secure
     */
    getPages: (
      query?: {
        /** Sort by attributes ascending (asc) or descending (desc) */
        sort?: string;
        /** Return page/pageSize (default: true) */
        "pagination[withCount]"?: boolean;
        /** Page number (default: 0) */
        "pagination[page]"?: number;
        /** Page size (default: 25) */
        "pagination[pageSize]"?: number;
        /** Offset value (default: 0) */
        "pagination[start]"?: number;
        /** Number of entities to return (default: 25) */
        "pagination[limit]"?: number;
        /** Fields to return (ex: title,author) */
        fields?: string;
        /** Relations to return */
        populate?: string;
        /** Filters to apply */
        filters?: Record<string, any>;
        /** Locale to apply */
        locale?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PageListResponse, Error>({
        path: `/pages`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Page
     * @name PostPages
     * @request POST:/pages
     * @secure
     */
    postPages: (data: PageRequest, params: RequestParams = {}) =>
      this.request<PageResponse, Error>({
        path: `/pages`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Page
     * @name GetPagesId
     * @request GET:/pages/{id}
     * @secure
     */
    getPagesId: (id: number, params: RequestParams = {}) =>
      this.request<PageResponse, Error>({
        path: `/pages/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Page
     * @name PutPagesId
     * @request PUT:/pages/{id}
     * @secure
     */
    putPagesId: (id: number, data: PageRequest, params: RequestParams = {}) =>
      this.request<PageResponse, Error>({
        path: `/pages/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Page
     * @name DeletePagesId
     * @request DELETE:/pages/{id}
     * @secure
     */
    deletePagesId: (id: number, params: RequestParams = {}) =>
      this.request<number, Error>({
        path: `/pages/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  promos = {
    /**
     * No description
     *
     * @tags Promo
     * @name GetPromos
     * @request GET:/promos
     * @secure
     */
    getPromos: (
      query?: {
        /** Sort by attributes ascending (asc) or descending (desc) */
        sort?: string;
        /** Return page/pageSize (default: true) */
        "pagination[withCount]"?: boolean;
        /** Page number (default: 0) */
        "pagination[page]"?: number;
        /** Page size (default: 25) */
        "pagination[pageSize]"?: number;
        /** Offset value (default: 0) */
        "pagination[start]"?: number;
        /** Number of entities to return (default: 25) */
        "pagination[limit]"?: number;
        /** Fields to return (ex: title,author) */
        fields?: string;
        /** Relations to return */
        populate?: string;
        /** Filters to apply */
        filters?: Record<string, any>;
        /** Locale to apply */
        locale?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PromoListResponse, Error>({
        path: `/promos`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Promo
     * @name PostPromos
     * @request POST:/promos
     * @secure
     */
    postPromos: (data: PromoRequest, params: RequestParams = {}) =>
      this.request<PromoResponse, Error>({
        path: `/promos`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Promo
     * @name GetPromosId
     * @request GET:/promos/{id}
     * @secure
     */
    getPromosId: (id: number, params: RequestParams = {}) =>
      this.request<PromoResponse, Error>({
        path: `/promos/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Promo
     * @name PutPromosId
     * @request PUT:/promos/{id}
     * @secure
     */
    putPromosId: (id: number, data: PromoRequest, params: RequestParams = {}) =>
      this.request<PromoResponse, Error>({
        path: `/promos/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Promo
     * @name DeletePromosId
     * @request DELETE:/promos/{id}
     * @secure
     */
    deletePromosId: (id: number, params: RequestParams = {}) =>
      this.request<number, Error>({
        path: `/promos/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  upload = {
    /**
     * @description Upload files
     *
     * @tags Upload - File
     * @name UploadCreate
     * @request POST:/upload
     * @secure
     */
    uploadCreate: (
      data: {
        /** The folder where the file(s) will be uploaded to (only supported on strapi-provider-upload-aws-s3). */
        path?: string;
        /** The ID of the entry which the file(s) will be linked to */
        refId?: string;
        /** The unique ID (uid) of the model which the file(s) will be linked to (api::restaurant.restaurant). */
        ref?: string;
        /** The field of the entry which the file(s) will be precisely linked to. */
        field?: string;
        files: File[];
      },
      params: RequestParams = {},
    ) =>
      this.request<UploadFile[], any>({
        path: `/upload`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Upload - File
     * @name FilesList
     * @request GET:/upload/files
     * @secure
     */
    filesList: (params: RequestParams = {}) =>
      this.request<UploadFile[], any>({
        path: `/upload/files`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Upload - File
     * @name FilesDetail
     * @request GET:/upload/files/{id}
     * @secure
     */
    filesDetail: (id: string, params: RequestParams = {}) =>
      this.request<UploadFile, any>({
        path: `/upload/files/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Upload - File
     * @name FilesDelete
     * @request DELETE:/upload/files/{id}
     * @secure
     */
    filesDelete: (id: string, params: RequestParams = {}) =>
      this.request<UploadFile, any>({
        path: `/upload/files/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  uploadIdId = {
    /**
     * @description Upload file information
     *
     * @tags Upload - File
     * @name UploadIdCreate
     * @request POST:/upload?id={id}
     * @secure
     */
    uploadIdCreate: (
      id: string,
      query: {
        /** File id */
        id: string;
      },
      data: {
        fileInfo?: {
          name?: string;
          alternativeText?: string;
          caption?: string;
        };
        /** @format binary */
        files?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<UploadFile[], any>({
        path: `/upload?id=${id}`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  connect = {
    /**
     * @description Redirects to provider login before being redirect to /auth/{provider}/callback
     *
     * @tags Users-Permissions - Auth
     * @name ConnectDetail
     * @summary Login with a provider
     * @request GET:/connect/{provider}
     * @secure
     */
    connectDetail: (provider: string, params: RequestParams = {}) =>
      this.request<any, void | Error>({
        path: `/connect/${provider}`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  auth = {
    /**
     * @description Returns a jwt token and user info
     *
     * @tags Users-Permissions - Auth
     * @name LocalCreate
     * @summary Local login
     * @request POST:/auth/local
     * @secure
     */
    localCreate: (
      data: {
        identifier?: string;
        password?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UsersPermissionsUserRegistration, Error>({
        path: `/auth/local`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a jwt token and user info
     *
     * @tags Users-Permissions - Auth
     * @name LocalRegisterCreate
     * @summary Register a user
     * @request POST:/auth/local/register
     * @secure
     */
    localRegisterCreate: (
      data: {
        username?: string;
        email?: string;
        password?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UsersPermissionsUserRegistration, Error>({
        path: `/auth/local/register`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users-Permissions - Auth
     * @name CallbackList
     * @summary Default Callback from provider auth
     * @request GET:/auth/{provider}/callback
     * @secure
     */
    callbackList: (provider: string, params: RequestParams = {}) =>
      this.request<UsersPermissionsUserRegistration, Error>({
        path: `/auth/${provider}/callback`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users-Permissions - Auth
     * @name ForgotPasswordCreate
     * @summary Send rest password email
     * @request POST:/auth/forgot-password
     * @secure
     */
    forgotPasswordCreate: (
      data: {
        email?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          ok?: "true";
        },
        Error
      >({
        path: `/auth/forgot-password`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users-Permissions - Auth
     * @name ResetPasswordCreate
     * @summary Rest user password
     * @request POST:/auth/reset-password
     * @secure
     */
    resetPasswordCreate: (
      data: {
        password?: string;
        passwordConfirmation?: string;
        code?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UsersPermissionsUserRegistration, Error>({
        path: `/auth/reset-password`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users-Permissions - Auth
     * @name ChangePasswordCreate
     * @summary Update user's own password
     * @request POST:/auth/change-password
     * @secure
     */
    changePasswordCreate: (
      data: {
        password: string;
        currentPassword: string;
        passwordConfirmation: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UsersPermissionsUserRegistration, Error>({
        path: `/auth/change-password`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users-Permissions - Auth
     * @name EmailConfirmationList
     * @summary Confirm user email
     * @request GET:/auth/email-confirmation
     * @secure
     */
    emailConfirmationList: (
      query?: {
        /** confirmation token received by email */
        confirmation?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void | Error>({
        path: `/auth/email-confirmation`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users-Permissions - Auth
     * @name SendEmailConfirmationCreate
     * @summary Send confirmation email
     * @request POST:/auth/send-email-confirmation
     * @secure
     */
    sendEmailConfirmationCreate: (
      data: {
        email?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          email?: string;
          sent?: "true";
        },
        Error
      >({
        path: `/auth/send-email-confirmation`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  usersPermissions = {
    /**
     * No description
     *
     * @tags Users-Permissions - Users & Roles
     * @name PermissionsList
     * @summary Get default generated permissions
     * @request GET:/users-permissions/permissions
     * @secure
     */
    permissionsList: (params: RequestParams = {}) =>
      this.request<
        {
          permissions?: UsersPermissionsPermissionsTree;
        },
        Error
      >({
        path: `/users-permissions/permissions`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users-Permissions - Users & Roles
     * @name RolesList
     * @summary List roles
     * @request GET:/users-permissions/roles
     * @secure
     */
    rolesList: (params: RequestParams = {}) =>
      this.request<
        {
          roles?: (UsersPermissionsRole & {
            nb_users?: number;
          })[];
        },
        Error
      >({
        path: `/users-permissions/roles`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users-Permissions - Users & Roles
     * @name RolesCreate
     * @summary Create a role
     * @request POST:/users-permissions/roles
     * @secure
     */
    rolesCreate: (
      data: {
        name?: string;
        description?: string;
        type?: string;
        permissions?: UsersPermissionsPermissionsTree;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          ok?: "true";
        },
        Error
      >({
        path: `/users-permissions/roles`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users-Permissions - Users & Roles
     * @name RolesDetail
     * @summary Get a role
     * @request GET:/users-permissions/roles/{id}
     * @secure
     */
    rolesDetail: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          role?: UsersPermissionsRole;
        },
        Error
      >({
        path: `/users-permissions/roles/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users-Permissions - Users & Roles
     * @name RolesUpdate
     * @summary Update a role
     * @request PUT:/users-permissions/roles/{role}
     * @secure
     */
    rolesUpdate: (
      role: string,
      data: {
        name?: string;
        description?: string;
        type?: string;
        permissions?: UsersPermissionsPermissionsTree;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          ok?: "true";
        },
        Error
      >({
        path: `/users-permissions/roles/${role}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users-Permissions - Users & Roles
     * @name RolesDelete
     * @summary Delete a role
     * @request DELETE:/users-permissions/roles/{role}
     * @secure
     */
    rolesDelete: (role: string, params: RequestParams = {}) =>
      this.request<
        {
          ok?: "true";
        },
        Error
      >({
        path: `/users-permissions/roles/${role}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags Users-Permissions - Users & Roles
     * @name UsersList
     * @summary Get list of users
     * @request GET:/users
     * @secure
     */
    usersList: (params: RequestParams = {}) =>
      this.request<UsersPermissionsUser[], Error>({
        path: `/users`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users-Permissions - Users & Roles
     * @name UsersCreate
     * @summary Create a user
     * @request POST:/users
     * @secure
     */
    usersCreate: (
      data: {
        email: string;
        username: string;
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        UsersPermissionsUser & {
          role?: UsersPermissionsRole;
        },
        Error
      >({
        path: `/users`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users-Permissions - Users & Roles
     * @name UsersDetail
     * @summary Get a user
     * @request GET:/users/{id}
     * @secure
     */
    usersDetail: (id: string, params: RequestParams = {}) =>
      this.request<UsersPermissionsUser, Error>({
        path: `/users/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users-Permissions - Users & Roles
     * @name UsersUpdate
     * @summary Update a user
     * @request PUT:/users/{id}
     * @secure
     */
    usersUpdate: (
      id: string,
      data: {
        email: string;
        username: string;
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        UsersPermissionsUser & {
          role?: UsersPermissionsRole;
        },
        Error
      >({
        path: `/users/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users-Permissions - Users & Roles
     * @name UsersDelete
     * @summary Delete a user
     * @request DELETE:/users/{id}
     * @secure
     */
    usersDelete: (id: string, params: RequestParams = {}) =>
      this.request<UsersPermissionsUser, Error>({
        path: `/users/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users-Permissions - Users & Roles
     * @name GetUsers
     * @summary Get authenticated user info
     * @request GET:/users/me
     * @secure
     */
    getUsers: (params: RequestParams = {}) =>
      this.request<UsersPermissionsUser, Error>({
        path: `/users/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users-Permissions - Users & Roles
     * @name CountList
     * @summary Get user count
     * @request GET:/users/count
     * @secure
     */
    countList: (params: RequestParams = {}) =>
      this.request<number, Error>({
        path: `/users/count`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
