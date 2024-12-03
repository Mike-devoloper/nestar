export enum Message {
    SOMETHING_WENT_WRONG = " Something went wrong!",
    NO_DATA_FOUND = "No data found",
    CREATE_FAILED = "Create failed",
    UPDATE_FAILED = "Update failed",
    REMOVE_FAILED = "Remove failed",
    UPLOAD_FAILED = "Upload failed",
    BAD_REQUEST = "Bad request",

    USED_MEMBER_NICK_OR_PHONE = "Already used membernick or phone",
    NO_MEMBER = "No member with that nick",
    BLOCKED_USER = "You have been blocked",
    WRONG_PASSWORD = "Wrong password, try again!",
    NOT_AUTHENTICATED = "You are not authenticated, Please login first",
    TOKEN_NOT_EXIST = "Bearer token is not provided",
    ONLY_SPECIFIC_ROLES_ALLOWED = "Allowed only members with specific roles",
    NOT_ALLOWED_REQUEST = "Not allowed request",
    PROVIDE_ALLOWED_REQUEST = "Please provide only jpg, jpeg and png",
    SELF_SUBSCRIPTION_DENIED = "Self subscription is denied" 
}