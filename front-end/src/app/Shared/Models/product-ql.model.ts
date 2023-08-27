import { ProductoModel } from "./productos.models";

export class ResponseQL {
    productos!: Producto[]
}
  
export class Producto {
    id!: number;
    codigoPrincipal!: string;
    imagenes!: string;
    nombre!: string;
    precio!: number;
    rating!: number;
    imageHeight?: number;
    imageWidth?: number;
    constructor(
        id: number,
        
        codigoPrincipal: string,
        imagenes: string,
        nombre: string,
        precio: number,
        rating: number,
        imageHeight?: number,
        imageWidth?: number,
    ){
        this.id=id
        this.codigoPrincipal=codigoPrincipal
        this.imagenes=imagenes
        this.nombre=nombre
        this.precio=precio
        this.rating=rating
        this.imageHeight=imageHeight
        this.imageWidth = imageWidth
    
    }
}