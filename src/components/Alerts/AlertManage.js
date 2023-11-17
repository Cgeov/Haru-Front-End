import Swal from 'sweetalert2';

const showSweetAlert = (title, icon) => {
    const Toast= Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: icon,
        title: title
      });
    
};
export function ManageError(data){
  Swal.fire({
    icon: "error",
    title: "Error en los siguientes campos:",
    text: data,
    confirmButtonColor: '#7C2750'
  })
}

export function confirmationAlert(titulo){
  return Swal.fire({
    icon: "warning",
    title: titulo,
    showCancelButton: true,
    confirmButtonColor: '#7C2750'
  })
}

export default showSweetAlert;