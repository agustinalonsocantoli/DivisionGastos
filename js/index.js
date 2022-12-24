'use strict'

$(document).ready(function() {

    $('.btnLimpiar').hide();
    // ------------------------------------- ARRAYS Y VARIABLES -------------------------------------
    var listaPersonas = new Array();
    var listaGastos = new Array();
    var gastosDivididos = new Array();
    var guardarGastos = new Array();

    // ------------------------------------- DARK AND LIGHT MODE -------------------------------------
    $('.figura').click(function() {

        if (!$(this).hasClass('figuraDark')){
            $('.figura').removeClass('figuraLight');
            $('.figura').addClass('figuraDark');
    
            $('.indicador').removeClass('indicadorLight');
            $('.indicador').addClass('indicadorDark');
    
            $('.sol').removeClass('solLight');
            $('.sol').addClass('solDark');
    
            $('.luna').removeClass('lunaDark');
            $('.luna').addClass('lunaLight');

            $('body').css({
                'background': 'rgb(255 255 255)', 
                // 'color': '#2a2a2a'
            });

            $('.barNav').css('background', 'rgb(42 42 42 / 100%)');
            $('.content').css({
                // 'background': 'rgb(153 160 174 / 20%)',
                '-webkit-box-shadow': '6px 6px 10px 0px rgba(27,27,27,0.8)',
                '-moz-box-shadow': '6px 6px 10px 0px rgba(27,27,27,0.8)',
                'box-shadow': '6px 6px 10px 0px rgba(27,27,27,0.8)'
            });
            $('.footer').css('background', 'rgb(42 42 42 / 100%)');
            // $('a').css('color', '#2a2a2a');

            // $('.content h3').css('border-bottom', '1px solid #2A2A2A');
            // $('.content input').css('color', '#2A2A2A');
            // $('.btnAgregar, .btnFin, .btnLimpiar').css('color', '#2A2A2A');
            // $('.btnAgregar:active, .btnFin:active, .btnLimpiar:active').css('background', 'rgb(0 0 0 / 70%) !important');
            // $('.listContainer, .resultado').css('border', '1px solid #2A2A2A');
    
        } else if ($(this).hasClass('figuraDark')) {
            $('.figura').removeClass('figuraDark');
            $('.figura').addClass('figuraLight');
    
            $('.indicador').removeClass('indicadorDark');
            $('.indicador').addClass('indicadorLight');
    
            $('.sol').removeClass('solDark');
            $('.sol').addClass('solLight');
    
            $('.luna').removeClass('lunaLight');
            $('.luna').addClass('lunaDark');

            $('body').css({
                'background': 'rgb(0 0 0)',
                'color': '#ebebea'
            });

            $('.barNav').css('background', 'rgb(42 42 42 / 70%)');
            $('.content').css({
                'background': 'rgb(42 42 42 / 100%)',
                '-webkit-box-shadow': '4px 4px 8px 0px rgba(235,235,234,0.5)',
                '-moz-box-shadow': '4px 4px 8px 0px rgba(235,235,234,0.5)',
                'box-shadow': '4px 4px 8px 0px rgba(235,235,234,0.5)'
            
            });
            $('.footer').css('background', 'rgb(42 42 42 / 70%)');
            $('a').css('color', '#ebebea');


            $('.content h3').css('border-bottom', '1px solid #ebebea');
            $('.content input').css('color', '#ebebea');
            $('.btnAgregar, .btnFin, .btnLimpiar').css('color', '#ebebea');
            $('.btnAgregar:active, .btnFin:active, .btnLimpiar:active').css('background', 'rgb(190 188 186 / 70%) !important');
            $('.listContainer, .resultado').css('border', '1px solid #ebebea');   

        }
    });

    // ------------------------------------- CARGAR DATOS -------------------------------------
    $(".btnAgregar").click(function() {

        let nombre = $(".addNombre");
        let gasto = $(".addGasto");

        if(nombre.val() != '' && gasto.val() != '') {
            $(".listNombres").append(`<li>${capitalizeFirstLetter(nombre.val())}</li>`);
            $(".listGastos").append(`<li>$${parseFloat(gasto.val())}</li>`);
            $(".icono").append(`<li class="delete">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="12" height="12" viewBox="0 0 24 24" stroke-width="2" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
            </li>`);

            listaPersonas.push(capitalizeFirstLetter(nombre.val()))
            listaGastos.push(parseFloat(gasto.val()));

            nombre.val('');
            gasto.val('');
        }
    });

    // ------------------------------------- BORRAR DATO -------------------------------------
    $("ul").on('click', '.delete', function() {
        let indice = $(this).index();

        $("li:nth-child(" + (indice + 1) + ")").remove();

        listaPersonas.splice(indice, 1);
        listaGastos.splice(indice, 1);
    });


    // ------------------------------------- OBTENER DATOS -------------------------------------

    $(".btnFin").click(function() {

        let totalGastos = calcularTotal(listaGastos);
        let totalPersonas = contarPersonas(listaPersonas);
        let division = divisionTotal(totalGastos, totalPersonas)

        $('.totalGastos span').remove()

        $('.totalGastos').append(`<span>$${totalGastos}</span>`)

        if(totalPersonas > 0){
            $('.totalPersonas').append(`<span>Total de Personas a dividir ${totalPersonas}</span>`)
            $('.division').append(`<span>Total cada uno $${division}</span>`)
        }
        

        comparacionIndividual(listaGastos, division, gastosDivididos, guardarGastos);        
        mostrarResultados(listaPersonas, gastosDivididos);
        cancelaciones(listaPersonas, gastosDivididos, guardarGastos);

        $(".addNombre").prop('disabled', true);
        $(".addGasto").prop('disabled', true);
        $('.btnAgregar').hide();
        $('.btnFin').hide();
        $('.delete').hide();
        $('.btnLimpiar').show();

        
    });

    // ------------------------------------- RELOAD PAGE -------------------------------------
    $('.btnLimpiar').click(function() {
        location.reload();
    });
});


// ------------------------------------- FUNCIONES -------------------------------------

function calcularTotal(lista) {
    let total = 0;

    for(let i = 0; i < lista.length; i++) {
        total += lista[i];
    }

    return parseFloat(total.toFixed(2));
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function contarPersonas(lista) {
    
    let total = lista.length;

    return total;
}

function divisionTotal(gastos, personas) {
    let total = gastos / personas;

    return parseFloat(total.toFixed(2));
}

function comparacionIndividual(listaGastos, totalCadaUno, nuevaLista, listaRespaldo) {

    for(let index in listaGastos) {
        let comparacion = listaGastos[index] - totalCadaUno
        
        nuevaLista.push(parseFloat(comparacion.toFixed(2)));
        listaRespaldo.push(parseFloat(comparacion.toFixed(2)));
    }

    return nuevaLista;    
}

function mostrarResultados(listaPersonas, listaDividida) {
    let i = 0;
    let resultado;

    while(i < listaPersonas.length && i <listaDividida.length) {
        if(listaDividida[i] < 0){
            resultado = `${listaPersonas[i]} → <strong class="abonar">Abonar</strong> $${listaDividida[i] * -1}`
            $('.cuentas').append(`<p>${resultado}</p>`)
        } 
        
        if(listaDividida[i] > 0) {
            resultado = `${listaPersonas[i]} → <strong class="obtener">Obtener</strong> $${listaDividida[i]}`
            $('.cuentas').append(`<p>${resultado}</p>`)
        } 
        
        if(listaDividida[i] == 0){
            resultado = `${listaPersonas[i]} → Esta en $${listaDividida[i]}`
            $('.cuentas').append(`<p>${resultado}</p>`)
        }
        
        i ++;
    }
}

function cancelaciones(listaPersonas, listaGastos, listaRespaldo) {
    var inicio = 0;
    var continuacion = 0;
    var resta = 0;
    var resultado = 0;

    while(inicio <= listaPersonas.length - 1){
        while(continuacion <= listaPersonas.length - 1 ) {
            if(listaGastos[inicio] != 0 && listaGastos[continuacion] != 0 && continuacion != inicio){
                if(listaGastos[inicio] < 0 && listaGastos[continuacion] > 0){
                    resta = listaGastos[inicio] + listaGastos[continuacion];
                    if(resta < 0) {
                        resultado = listaGastos[continuacion];
                        listaGastos[inicio] = resta;
                        listaGastos[continuacion] = 0;
                    } else if(resta > 0) {
                        resultado = listaGastos[inicio] * -1;
                        listaGastos[continuacion] = resta;
                        listaGastos[inicio] = 0;
                    } else if(resta == 0) {
                        resultado = listaGastos[inicio] * -1;
                        listaGastos[continuacion] = 0;
                        listaGastos[inicio] = 0;
                    }
                    $('.cancelaciones').append(`<p>${listaPersonas[inicio]} debe <strong class="abonar">$${parseFloat(resultado.toFixed(2))}</strong> a ${listaPersonas[continuacion]}</p>`)
                }
            }

            continuacion++;
            resta = 0;
            resultado = 0;
        }
        inicio++;
        continuacion = 0;
    }
    
    listaGastos = listaRespaldo;
};