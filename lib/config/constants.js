"use strict";

export const SUPPORTED_DATABASE = {
    POSTGRES: 'postgres',
    SQLITE: 'sqlite',
    MYSQL: 'mysql',
};

export const MSG_KR = {
    ERROR_CHECK_IDPW: "이메일과 패스워드를 다시 한 번 확인하여 주십시오.",
    EMAIL_EMPTY: "이메일을 입력해 주십시오.",
    EMAIL_REQUIRED: "이메일을 입력해 주십시오.",
    EMAIL_NOT_VALID: "이메일 형태가 올바르지 않습니다.",
    PW_EMPTY: "패스워드를 입력해 주십시오.",
    PW_REQUIRED: "패스워드를 입력해 주십시오.",
    PW_TOO_SHORT: "패스워드는 최소 6자 이상이어야 합니다.",
    NAME_REQUIRED: "이름을 입력해 주십시오.",
    SIGNUP_SUCCESSFUL: "회원가입에 성공하였습니다!",
};

export const ERRCODE_KR = {
    // 원인이 여러가지라 구체적인 에러메시지로 명세하지는 못함.
    // Prisma에서 여러가지 에러를 발생시키는 것이므로, 이 경우 Sentry로 로그 확인하고 대응해야 함.
    ERR001: "회원가입에 실패하였습니다. (에러코드 ERR001)",
    // ERR002의 경우도 Passport가 영어 메시지를 발생시키기 때문에,
    // 에러를 뭉뚱그려서 로그인 실패의 형태로 명세하였음.
    ERR002: "이메일과 패스워드를 다시 확인해주세요. (에러코드 ERR002)",
}