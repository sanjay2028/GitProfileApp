const STATUS_OK = 200;
const STATUS_VALIDATION = 422;
const STATUS_NOT_FOUND = 404;
const STATUS_INTERNAL_ERROR = 501;
const AVATOR_DIR_URL = `${process.env.BASE_URL}:${process.env.PORT}/${process.env.IMAGE_DIR}`
const DEFAULT_AVATOR = process.env.DEFAULT_AVATOR_FILE

/**
 * DB Messages
 */
const DB_CONNECTION_SUCCESS = "Connected to MongoDB Successfully";
const DB_CONNECTION_FAILED = "DB Connection failed : %s";


/**
 * Errors
 */
const ERROR_FETCHING_USER = 'Error occupred while fetching the user';

module.exports = {
    STATUS_OK,
    STATUS_VALIDATION,
    STATUS_NOT_FOUND,
    STATUS_INTERNAL_ERROR,
    DB_CONNECTION_SUCCESS,
    DB_CONNECTION_FAILED,
    AVATOR_DIR_URL,
    DEFAULT_AVATOR
}
