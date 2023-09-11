interface ISlides {
  slidesId: number;
  slidesName: string;
  slidesSize: null;
  description: null;
  createTime: null;
  updateTime: null;
  slidesUrl: null;
  catId: number;
  classLevelId: null;
  classLevelName: null;
  emptyPos: null;
  isDelete: null;
  typeName: null;
  sort: null;
  article: null;
  fileId: null;
  fileVersionId: null;
  videoUrl: null;
  imgUrl: null;
}

interface ISlidesDOPage {
  currentPage: number;
  pageSize: number;
  total: number;
  entityList: ISlides[];
  assistData: null;
}

export interface ISection {
  catId: number;
  catName: string;
  parentId: number;
  parentName: string;
  catLevel: number;
  imgUrl: string;
  classLevelId: string;
  classLevelName: string;
  sort: number;
  status: number;
  description: string;
  slidesDOs: null;
  slidesDOPage: ISlidesDOPage;
}

export const defaultAddress = (): IAddress => {
  return {
    firSubId: '',
    firSubName: '',
    secSubId: '',
    secSubName: '',
    secSubLongImg: '',
    courseId: '',
    courseName: '',
    classLevelId: '',
    classLevelName: ''
  };
};

export interface IAddress {
  firSubId: string;
  firSubName: string;
  secSubId: string;
  secSubName: string;
  secSubLongImg: string;
  courseId: string;
  courseName: string;
  classLevelId: string;
  classLevelName: string;
  slidesName?: string;
}
