const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'El password es obligatorio'],
  },
});

// UsuarioSchema.methods.toJSON = function () {
//   const { __v, password, _id, ...usuario } = this.toObject();
//   usuario.uid = _id;
//   return usuario;
// };

module.exports = model('Usuario', UsuarioSchema);
