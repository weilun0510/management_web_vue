export function phone(rule, value, callback) {
  if (!value) {
    return callback(new Error('手机号不能为空'));
  } else if (!/^1[34578]\d{9}$/.test(value)) {
    callback('手机号格式不正确');
  } else {
    callback();
  }   
}

// export function password(rule, value, callback) {
//   const reg = /^[a-zA-Z0-9]{6, }$/;
//   if (!value) {
//     return callback(new Error('密码不能为空'));
//   } else if (!new RegExp(reg).test(value)) {
//     callback('密码不能少于6位数');
//   } else {
//     callback();
//   }   
// }

// password: [
//   { required: true, trigger: 'blur', message: '密码不能为空' },
//   { type: 'string', min: 6, message: '密码不能少于6位数', trigger: 'blur' }
// ],