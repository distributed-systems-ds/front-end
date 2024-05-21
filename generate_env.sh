#!/bin/bash

# Archivo de salida
OUTPUT_FILE=".env.production"

# Limpiar el archivo si ya existe
> $OUTPUT_FILE

# Iterar sobre todas las variables de entorno
for var in $(printenv | awk -F= '{print $1}')
do
  # Obtener el valor de la variable de entorno
  value=$(printenv $var)
  # Escribir la variable y su valor en el archivo .env.production
  echo "$var=$value" >> $OUTPUT_FILE
done

echo "Archivo .env.production generado con éxito."
