import React from 'react';
import Laptop from '../assets/laptop.jpg';

const Analytics = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={Laptop} alt='/' />
        <div className='flex flex-col justify-center'>
          {/* <p className='text-[#00df9a] font-bold '>POS</p> */}
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>AsVentas 4.5</h1>
          <p>
            Este sistema está formado por varios módulos que se integran
            para conformar una herramienta de gestión empresarial que le permite
            tener el control absoluto de su empresa, con una excelente gestión
            de inventario, cuentas por Cobrar, entre otros. Nuestro sistema
            es totalmente personalizable a las necesidades de su empresa.
            <br/>
            <br/>
            Permite generar sus reportes fiscales: 606, 607 y 608. Este sistema ha sido Desarrollado en Visual Studio con SQL Server y está homologado por la Dirección General de Impuestos Internos (DGII) para trabajar con impresoras fiscales.
          </p>
          <button className='bg-[#375aa5] text-[#ffffff] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Solicitar</button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;