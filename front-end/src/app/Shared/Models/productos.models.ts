export class Producto{
    id!:number;
    codigo_principal!:String;
    nombre!:String;
    precio!:number;
    stock!:number;
    bodega!:String;
    estado!:String;
}

export interface ApiPayload {
    bodega:String;
    categoria:String;
    codigo:String;
    producto:String

}

export interface AuthResponse {
    success: boolean
    dataResponse: AuthDataResponse
    mensaje: string
    token: string
  }
  
  export interface AuthDataResponse {
    idUsuario: number
    idPerfil: number
    tipoPerfil: string
    nombreUsuario: string
    fotoURL: string
    estado: string
    cantEmpresas: number
    idEmpresa: number
    cantSucursales: number
    idSucursal: number
    fechaCreacion: string
  }
  

  
  export interface ProductosModel {
    ID_PRODUCTO: number
    CODIGOPRINCIPAL: string
    NOMBRE: string
    PRECIOSINIVA: number
    STOCK: number
    BODEGA: string
    CATEGORIA: string
    COD_AUXILIAR: string
    PESO: number
    TIPO_SOLUCIONES: string
    CONTROL_SERIES: string
    SUBCATEGORIA?: string
    UNIDAD_MEDIDA: string
    MARCA: string
    MODELO: string
    COSTO?: number
    ESTADO: string
    fotoURL?:string
  }

  export interface BodegaResponse {
    success: boolean
    dataResponse: ProductosModel[]
    mensaje: string
  }