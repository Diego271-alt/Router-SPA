class Router {

    /*en este constructor vamos a declarar las rutas y la funcion
    load intitalRoute sera privada pero en este caso solo desamos aue sea ejecutada
    */
    constructor(routes){
        this.routes=routes;
        this._loadInitialRoute();
    }

    loadRoute(...urlSegs){
        const matchedRoute= this._matchUrlToRoute(urlSegs);

        //
        const url  = `/${urlSegs.join('/')}`;
        history.pushState({}, 'this works', url);
        const routerOutElem = document.querySelectorAll('[data-router]')[0];

        routerOutElem.innerHTML =  matchedRoute.template;




    }



    //metodo para indicar si es que una ruta fue encontrada
    //su parametro en este caso es los urlssegmentos que se hardcodean 

    _matchUrlToRoute (urlSegs){

        /*esta contsnate tiene una funcion que se llama y que sirve para buscar un elemento en este
        caso una ruta 
         */
        const matchedRoute = this.routes.find(route => {

            /*si la ruta no fue encontrada no funciona se returna a false
            tomamos la route y lo que hacemos es cortarla para que de esta manera 
            obtengamos el array [/,  aboutMe] de esta manera vamos a tenerlo en dos 
            luego con el slice lo que hacemos es que cortamos desde o en el indice uno en este caso solo cortariamos
            [contacto] y este va a ser el que tenga el archivo routterPathSegs
             */
            const routePathSegs = route.path.split('/').slice(1);

            /*en esta comparacion lo que estamos haciendo es saber si el tamaño es distinto pero esta forma de comprarlo
            depende en realidad de que sepamos nosotros que llos paths tienen diferentes medidad
             */
            if(routePathSegs.length !== urlSegs.length){
                return false;


            }

            /*en este caso lo que estoy haciendo es que 
             retornar su es que  son iguales el programa seguira entonces lo que hacemos es comprar
             con el metodo every 
             con este metodo al menos vamos a hacer que coincida con la primera letra del 
             las palabras este metodo nos verifica todos los elementos de un array y si si devuelve true 
              */
            return routePathSegs
                .every((routePathSeg,i)=> routePathSeg === urlSegs[i]);
                
        })

        return matchedRoute;


    }


    /*aca lo que hacemos justo es lo que dicen los nombres por ejepmplo gracias a esta
    funcion vamos a obtener el lugar en donde esta parado el usuario 
     */
    _loadInitialRoute(){

        /*con esta constante y el window.location.pathname.split() estamos 
        separar en un arreglo de dos elementos la ruta por ejemplo quedaría 
        [/,contacto ] entonces podriamos acceder a cualquiera de estos elementos
         */
         const pathNameSplit = window.location.pathname.split('/');
         /*en esta funcion lo que estamos haciendo es segmentar 
         estamos usando el operador ternario diciendo que si el tamaño del arreglo dado es mayor a uno 
         solo accedamos al indice 1 que sería del ejemplo anterior [/, contacto] sería el contacto si es que el elemento
         es solo uno por ejemplo [/] entonces al path segs se le da un string vació  */
        const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : '';

        /* con el ...pathsegs lo que estamos pasando es a  todo un obejto iterable por parametro  */
        this.loadRoute(...pathSegs)
    }


}




