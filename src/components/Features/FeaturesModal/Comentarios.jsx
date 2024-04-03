
const Comentario = () => {

    <div>
        <div class="rounded-3xl mx-auto w-10/12 flex flex-col bg-blue-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
            <p class="w-full text-2xl font-semibold text-white">HOLA!</p>
            <hr class="my-5 h-0.5 border-t-0 bg-neutral-100" />
            <p class="w-full text-white"> Tu opinion es importante. Nos gutaria saber que piensas sobre nosotros para asi brindarte un mejor servicio. <br/> Dejanos un comentario </p>
            
            <input class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" placeholder="" type="text" />

            <div class="buttons flex">
                <div class="rounded btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-white ml-auto  ">Cancel</div>

                <div class="rounded btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Enviar</div>
            </div>
        </div>
    </div>
}

export default Comentario;