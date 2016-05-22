export var CONTEXT ="";


/*返回所有app的列表 */
export var APP_LIST = CONTEXT +"/api/app/list";

/**生成一个app */
export var APP_CREATE = CONTEXT +"/api/app";

/**返回所有环境的列表 */
export var ENV_LIST = CONTEXT + "/api/env/list";

/**创建配置项 */
export var CONFIG_ITEM = CONTEXT + "/api/web/config/item";

/**生成配置, 采用直接上传文件方式 */
export var CONFIG_FILE = CONTEXT +"/api/web/config/file";

/**生成配置, 采用直接上传文本方式 */
export var CONFIG_TEXT = CONTEXT + "/api/web/config/filetext";

/**根据app, env 获取所有的 版本列表 */
export var VERSION_LIST = CONTEXT + "/api/web/config/versionlist";

/*根据app, env , version 获取所有的 配置列表，含有machine size, machine list,error num 等信息*/
export var CONFIG_LIST = CONTEXT + "/api/web/config/list";

/*根据app, env , version 获取所有的 配置列表，无machine size, machine list,error num 等信息 */
export var SIMPLE_LIST = CONTEXT +"/api/web/config/simple/list";

/*获取某个config的内容*/
export var CONFIG_ITEM = CONTEXT + "/api/web/config/";

/*以下载文件的形式下载配置*/
export var DOWNLOAD_ITEM = CONTEXT + "/api/web/config/download/";

/*以下载文件的形式批量下载配置*/
export var BATCH_DOWNLOAD = CONTEXT + "/api/web/config/downloadfilebatch";

/*修改配置项的值*/
export var UPDATE_CONFIG=CONTEXT+'/api/web/config/item/';

/*以上传文件的形式 修改配置文件的值*/
export var UPDATE_FILE = CONTEXT +"/api/web/config/file/";

/*以上传文件内容的形式 修改配置文件的值*/
export var UPDATE_TEXT = CONTEXT +"/api/web/config/filetext/";

export var CONFIG_ZK = "/api/web/config/zk/";

/*登录 */
export var SIGN_IN = CONTEXT +"/api/account/signin";

/*校验是否登录 */
export var CHECK_LOGIN = CONTEXT +"/api/account/session";

/*退出 */
export var SIGN_OUT = CONTEXT +"/api/account/signout";

export var ZK_INFO = "/api/zoo/zkdeplo";