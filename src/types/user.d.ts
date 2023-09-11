interface IUserInfo {
  createTime: string;
  imgUrl: string;
  isDelete: 0 | 1;
  password: string;
  phone: string;
  schoolId: string;
  schoolName: string;
  updateTime: string;
  userId: string;
}

export interface ILearnRecord {
  recordId: number;
  classLevelName: string | null;
  slidesName: string | null;
  createTime: string | null;
}

export interface IRecentStudyRecord {
  catId: number | null;
  catLevel: number | null;
  catName: string | null;
  classLevelId: number | null;
  classLevelName: string | null;
  createTime: string | null;
  description: string | null;
  imgUrl: string | null;
  isDelete: number | null;
  longImgUrl: string | null;
  parentId: number | null;
  sort: number | null;
  status: number | null;
  uncheckedImgUrl: string | null;
  updateTime: string | null;
}
