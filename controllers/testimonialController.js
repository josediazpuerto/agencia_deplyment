import { Testimonial }from '../models/testimoniales.js';

const guardarTestimonial = async (req, res) => {

    //validaciones

    const { nombre, email, mensaje } = req.body;

    const errores= [];

    if (nombre.trim() === ''){
        errores.push({mensaje: 'El Nombre esta Vacio'})
    };
    if (email.trim() === ''){
        errores.push({mensaje: 'El email esta Vacio'})
    };
    if (mensaje.trim() === ''){
        errores.push({mensaje: 'El Mensaje esta Vacio'})
    };

    if (errores.length > 0){

        //consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll();
        //mostrar la vista con los erreres
        res.render('testimoniales',{
            pagina: 'Testimoniales',
                errores,
                nombre,
                email,
                mensaje,
                testimoniales
            
        })
    } else {

        //almacenar en la base de datos

        try {

            await Testimonial.create({
                nombre, 
                email,
                mensaje
            });

            res.redirect('/testimoniales');
            
        } catch (error) {
            console.log(error);
        }
    }


    console.log(errores);
};

export {
    guardarTestimonial
} 