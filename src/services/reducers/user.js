export const RESTORE_PASS_REQUEST = "RESTORE_PASS_REQUEST ";
export const RESTORE_PASS_SUCCESS = "RESTORE_PASS_SUCCESS";
export const RESTORE_PASS_FAILED = "RESTORE_PASS_FAILED";

export const RESET_PASS_REQUEST = "RESET_PASS_REQUEST ";
export const RESET_PASS_SUCCESS = "RESET_PASS_SUCCESS";
export const RESET_PASS_FAILED = "RESET_PASS_FAILED";

export const REG_USER_REQUEST = "REG_USER_REQUEST ";
export const REG_USER_SUCCESS = "REG_USER_SUCCESS";
export const REG_USER_FAILED = "REG_USER_FAILED";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";

export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAILED = "LOGOUT_USER_FAILED";

export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILED = "REFRESH_TOKEN_FAILED";

export const UPDATE_USER_REQUEST="UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS="UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED="UPDATE_USER_FAILED";

export const GET_USER_REQUEST="GET_USER_REQUEST";
export const GET_USER_SUCCESS="GET_USER_SUCCESS";
export const GET_USER_FAILED="GET_USER_FAILED";
  
const initialAuthState = {
  user: {
    name: "",
    email: "",
  },
  restorePassRequest: false,
  restorePassFaild: false,
  resetPassRequest: false,
  resetPassFaild: false,
  regRequest: false, 
  regFailed: false,
  loginRequest: false,
  loginFaild: false,
  logoutRequest: false,
  logoutFaild: false,
  tokenRequest:false,
  tokenFailed:false,
  updateUserRequest:false,
  updateUserFailed:false,
  getUserRequest:false,
  getUserFailed:false,
  auth:false,
};
const authReduser = (state = initialAuthState, action) => {
  switch (action.type) {
    case RESTORE_PASS_REQUEST: {
        return {
          ...state,
          restorePassRequest: true,
          restorePassFaild: false,
        };
      }
      case RESTORE_PASS_SUCCESS: {
        return {
          ...state,
          restorePassRequest: false,
          restorePassFaild: false,
        };
      }
      case RESTORE_PASS_FAILED: {
        return {
          ...state,
          restorePassRequest: false,
          restorePassFaild: true,
        };
      }
    case RESET_PASS_REQUEST: {
      return {
        ...state,
        resetPassRequest: true,
        resetPassFailed: false,
      };
    }
    case RESET_PASS_SUCCESS: {
      return {
        ...state,
        resetPassRequest: false,
        resetPassFailed: false,
      };
    }
    case RESET_PASS_FAILED: {
      return {
        ...state,
        resetPassRequest: false,
        resetPassFailed: true,
      };
    }
    case REG_USER_REQUEST: {
        return {
          ...state,
          regRequest: true,
          regFailed: false,
        };
      }
      case REG_USER_SUCCESS: {
        return {
          ...state,
          user: action.user,
          regRequest: false,
          regFailed: false,
          auth:true,

        };
      }
      case REG_USER_FAILED: {
        return {
          ...state,
          regRequest: false,
          regFailed: true,
        };
      }
      case (LOGIN_USER_REQUEST): {
        return {
          ...state,
          loginRequest: true,
          loginFailed: false,
        };
      }
      case (LOGIN_USER_SUCCESS): {
        return {
          ...state,
          user: action.user,
          loginRequest: false,
          loginFailed: false,
          auth: true,
        };
      }
      case (LOGIN_USER_FAILED): {
        return {
          ...state,
          loginRequest: false,
          loginFailed: true,
        };
      }
      case (LOGOUT_USER_REQUEST): {
        return {
          ...state,
          logoutRequest: true,
          logoutFailed: false,
        };
      }
      case (LOGOUT_USER_SUCCESS): {
        return {
          ...state,
          logoutRequest: false,
          logoutFailed: false,
          auth: false,
        };
      }
      case (LOGOUT_USER_FAILED): {
        return {
          ...state,
          logoutRequest: false,
          logoutFailed: true,
        };
      }
      case (REFRESH_TOKEN_REQUEST): {
        return {
          ...state,
          tokenRequest: true,
          tokenFailed: false,
        };
      }
      case (REFRESH_TOKEN_SUCCESS): {
        return {
          ...state,
          tokenRequest: false,
          tokenFailed: false,
        };
      }
      case (REFRESH_TOKEN_FAILED): {
        return {
          ...state,
          tokenRequest: false,
          tokenFailed: true,
        };
      }
      case (UPDATE_USER_REQUEST): {
        return {
          ...state,
          updateUserRequest: true,
          updateUserFailed: false,
          
        };
      }
      case (UPDATE_USER_SUCCESS): {
        return {
          ...state,
          updateUserRequest: false,
          updateUserFailed: false,
          user:action.user,
        };
      }
      case (UPDATE_USER_FAILED): {
        return {
          ...state,
          updateUserRequest: false,
          updateUserFailed: true,
        };
      }
      case (GET_USER_REQUEST): {
        return {
          ...state,
          getUserRequest: true,
          getUserFailed: false,
        };
      }
      case (GET_USER_SUCCESS): {
        return {
          ...state,
          getUserRequest: false,
          getUserFailed: false,
          user: action.user,
          auth: true
        };
      }
      
      case (GET_USER_FAILED): {
        return {
          ...state,
          getUserRequest: false,
          getUserFailed: true,
        };
      }
    default: {
        return state;
      }
  }
};
export default authReduser;
