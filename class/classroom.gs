  /**
   * Google Classroomの情報を持つクラス
   * @class
   */
  class Courses {
    /**
     * 参加する全てのコースのインスタンスを生成する
     * @constructor
     */
    constructor() {
      /** @type {Classroom.Courses} */
      this.courses = Classroom.Courses;
    }

    /**
     * すべてのコース リストから任意のプロパティを配列化して取得するメソッド
     * @param {Array.<string>} properties - 取得するプロパティ名
     * @return {Array.<Array<number|string>} array - すべてのコース リストの任意のプロパティ
     */
    getAllCoursesListAsArray(properties = ['room', 'name', 'enrollmentCode', 'id']) {
      const coursesList = this.getAllCoursesList();
      const courses = coursesList.courses;
      const array = courses.map(course => properties.
        map(property => course[property]))
      return array;
    }

    /** 
     * すべてのコース リストを取得するメソッド
     * @param {string} pageToken - ページ トークン
     * @param {Object.<string|Array>} 前回までのコース リスト
     * @return {Array.<Object>} すべてのコース リスト
     */
    getAllCoursesList(pageToken = '', preCoursesList = { courses: [] }) {
      const coursesList = this.getCoursesList(pageToken);
      preCoursesList.courses = preCoursesList.courses.concat(coursesList.courses);  // HACK: preCoursesList に追加することによって、nextPageToken プロパティのないコース リストに追加
      const allCoursesList = Object.keys(coursesList).includes('nextPageToken') ?
        this.getAllCoursesList(coursesList.nextPageToken, preCoursesList) :
        preCoursesList;
      return allCoursesList;
    }

    /**
     * コース リストを取得するメソッド
     * @param {string} pageToken - ページ トークン
     * @return {Array.<Object>} コース リスト
     */
    getCoursesList(pageToken = '') {
      const coursesList = this.courses.list({ pageToken });
      return coursesList;
    }
  }