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

export default showSweetAlert;