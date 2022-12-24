# # LISTAS PARA DIVISION DE GASTOS
# personas = []
# gastos = []
# personas_cargadas = []
# gastos_divididos = []
# personas_gastos_divididos = []


    
# def preguntar_gasto(message):
#     # SE CARGA EL GASTO QUE REALIZO
#     global nombre
#     nombre = message.text
#     nombre = nombre.capitalize()
#     if nombre not in personas:
#         personas.append(nombre)
#         markup = ForceReply()
#         mensaje_gasto = bot.send_message(message.chat.id, f"{nombre} Ingrese gasto!", reply_markup= markup)
#         bot.register_next_step_handler(mensaje_gasto, continuar_finalizar)
#     else:    
#         markup = ForceReply()
#         global nombre_repetido
#         nombre_repetido = personas.index(nombre)
#         mensaje_gasto = bot.send_message(message.chat.id, f"{nombre} ya se encuentra cargado\nIngrese gasto!", reply_markup= markup)
#         bot.register_next_step_handler(mensaje_gasto, sumar_gasto)
        
# def sumar_gasto(message):
    
#     try:
#         # MOSTRAMOS DATOS, DEFINIMOS BOTONES PARA AGREGAR MAS PERSONAS O FINALIZAR LAS CUENTAS
#         global gasto
#         gasto = float(message.text)
#         gasto_nuevo = gasto + gastos[nombre_repetido]
#         gastos[nombre_repetido] = gasto_nuevo
#         markup = ReplyKeyboardMarkup(
#         one_time_keyboard=True,
#         input_field_placeholder="Pulsa un boton",
#         resize_keyboard=True)
#         markup.add("Agregar", "Finalizar")
#         global datos
#         datos = bot.send_message(message.chat.id, f"Nombre: {nombre}\nGasto: {divisa}{gasto}\n", reply_markup=markup)
#         bot.register_next_step_handler(datos, guardar_personas)
#     except:
#         # SI EL USUARIO NO INGRESA UN NUMERO NOS TRAE LA EXCEPCION 
#         datos_error = bot.send_message(message.chat.id, "Debe ingresar un numero")
#         preguntar_gasto(datos_error)


# def continuar_finalizar(message):

#     try:
#         # MOSTRAMOS DATOS, DEFINIMOS BOTONES PARA AGREGAR MAS PERSONAS O FINALIZAR LAS CUENTAS
#         global gasto
#         gasto = float(message.text)
#         gastos.append(gasto)
#         markup = ReplyKeyboardMarkup(
#         one_time_keyboard=True,
#         input_field_placeholder="Pulsa un boton",
#         resize_keyboard=True)
#         markup.add("Agregar", "Finalizar")
#         global datos
#         datos = bot.send_message(message.chat.id, f"Nombre: {nombre}\nGasto: {divisa}{gasto}\n", reply_markup=markup)
#         bot.register_next_step_handler(datos, guardar_personas)
#     except:
#         # SI EL USUARIO NO INGRESA UN NUMERO NOS TRAE LA EXCEPCION 
#         datos_error = bot.send_message(message.chat.id, "Debe ingresar un numero")
#         preguntar_gasto(datos_error)


# def guardar_personas(message):
#     # COMPROBAMOS QUE EL USUARIO PRESIONE UN BOTON Y NO INGRESE UN TEXTO 
#     markup = ReplyKeyboardRemove()

#     if message.text == '/start':
#         mensaje_start = bot.send_message(message.chat.id, "Iniciando bot")
#         cmd_start(mensaje_start)
#     elif message.text != "Agregar" and message.text != "Finalizar":
#         mensaje_usuario = bot.send_message(message.chat.id, "ERROR: Debe pulsar uno de los dos botones!")
#         bot.register_next_step_handler(mensaje_usuario, guardar_personas)
#     elif message.text == "Finalizar":
#         if len(personas) <= 1 and len(gastos) <= 1:
#             mensaje_error = bot.send_message(message.chat.id, "Debe cargar mas de 1 Persona")
#             limpiar_listas()
#             elegir_divisa(mensaje_error)
#         else:






# # ------------------------------------ ACA EMPIEZA TODAS LAS FUNCIONES CORRESPONDIENTES -----------------------------------------




#             # SI EL USUARIO FINALIZA SE REALIZAN TODAS LAS FUNCIONES DE CALCULOS CORRESPONDIENTES
#             # SE MUESTRAN USUARIOS Y GASTOS 
#             indice = 0
#             for n in personas:
#                 for g in gastos:
#                     if indice <= len(personas)-1 or indice <= len(gastos)-1:
#                         personas_cargadas.append(f"{personas[indice]} - Gasto {divisa}{gastos[indice]}")
#                         indice += 1
#                     else:
#                         break
            
#             mostrar_personas_cargadas = "\n".join(personas_cargadas)
#             bot.send_message(message.chat.id, mostrar_personas_cargadas, reply_markup=markup)

#             # SE SUMAN TODOS LOS GASTOS PARA OBTENER EL TOTAL Y SE DIVIDE POR LA CANTIDAD DE PERSONAS
#             suma_gastos = 0
#             for gasto in gastos:
#                 suma_gastos += gasto
#             personas_a_dividir = len(personas)
#             bot.send_message(message.chat.id, f"Total {divisa}{suma_gastos}, son {personas_a_dividir} para dividir")

#             total_cada_uno = round(suma_gastos / personas_a_dividir, 2)
#             bot.send_message(message.chat.id, f"{divisa}{total_cada_uno} cada uno")

#             # SE REALIZA LA COMPARACION DEL TOTAL QUE CORRESPONDE Y DE LO QUE LA PERSONA GASTO EN REALIDAD
#             indice = 0
#             for g in gastos:
#                 resultado = g - total_cada_uno
#                 indice += 1
#                 gastos_divididos.append(resultado)

#             comienzo = 0
#             contador = 0

#             # SE INDICA SI LA PERSONA DEBE PAGAR O DEBE RECIBIR DETERMINADA SUMA
#             indice = 0
#             for n in personas:
#                 for g in gastos:
#                     if indice <= len(personas)-1 or indice <= len(gastos)-1:
#                         if gastos_divididos[indice] < 0:
#                             personas_gastos_divididos.append(f"{personas[indice]} - Abonar ({divisa}{gastos_divididos[indice] * -1})")
#                         elif gastos_divididos[indice] > 0:
#                             personas_gastos_divididos.append(f"{personas[indice]} - Obtener ({divisa}{gastos_divididos[indice]})")
#                         indice += 1

#             mostrar_division_final = "\n".join(personas_gastos_divididos)
#             bot.send_message(message.chat.id, mostrar_division_final)

#             # SE COMPARA CADA PERSONA INDIVIDUALMENTE CON TODAS LAS OTRAS PERSONA DE LA LISTA
#             #  Y ASI SE DETERMINA EL MONTO EXACTO Y A QUIEN SE DEBE CANCELAR LOS GASTOS PARA QUEDAR TODOS IGUALES
#             while True:
#                 if comienzo <= personas_a_dividir - 1:
#                     for g in gastos_divididos:
#                         if contador <= personas_a_dividir - 1:
                            
#                             if gastos_divididos[comienzo] != 0 and gastos_divididos[contador] != 0:
#                                 if gastos_divididos[comienzo] < 0 and gastos_divididos[contador] > 0:
#                                     comparacion = gastos_divididos[comienzo] + gastos_divididos[contador]
#                                     if comparacion < 0:
#                                         final = gastos_divididos[contador]
#                                         gastos_divididos[comienzo] = comparacion
#                                         gastos_divididos[contador] = 0.0
#                                     elif comparacion > 0:
#                                         final = gastos_divididos[comienzo] * -1
#                                         gastos_divididos[contador] = comparacion
#                                         gastos_divididos[comienzo] = 0.0
#                                     elif comparacion == 0:
#                                         final = gastos_divididos[comienzo] * -1
#                                         gastos_divididos[contador] = 0.0
#                                         gastos_divididos[comienzo] = 0.0
#                                     mostrar_cancelaciones = f"{personas[comienzo]} cancelar {divisa}{final} a {personas[contador]}"
#                                     mensaje_opciones = bot.send_message(message.chat.id, mostrar_cancelaciones.upper())

#                             contador += 1

#                     contador = 0
#                     comienzo += 1
#                 else:
#                     break
#             limpiar_listas()
#             boton_regresar(mensaje_opciones)

#     elif message.text == "Agregar":
#         preguntar_persona(message)