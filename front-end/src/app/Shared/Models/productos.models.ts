export class Producto{
  // id!:number;
  //   codigo_principal!:String;
  //   nombre!:String;
  //   precio!:number;
  //   tags?:String[];
  //   favorite:boolean=false;
  //   stars:number=0;
  //   imageURL?:string;
  //   // origins:
  //   stock!:number;
  //   bodega!:String;
  //   estado!:String;
  //   categoria?:string;
  constructor(
    id:number,
    codigo_principal:string,
    nombre:String,
    precio:number,
    // tags:String[],
    // favorite:boolean,
    stars:number,
    imageURL:string,
    // origins:
    // stock:number,
    // bodega:String,
    // estado:String,
    // categoria?:string,
  ){

  }
    
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
  

  
  export class ProductoModel {
    ID_PRODUCTO!: number;
    CODIGOPRINCIPAL!: string;
    NOMBRE!: string;
    PRECIOSINIVA!: number;
    STOCK?: number=0;
    BODEGA?: string='';
    CATEGORIA?: string='';
    ESTADO?: string='';
    COD_AUXILIAR?: string='';
    PESO?: number=0;
    TIPO_SOLUCIONES?: string='';
    CONTROL_SERIES?: string='';
    SUBCATEGORIA?: string;
    UNIDAD_MEDIDA?: string;
    MARCA?: string;
    MODELO?: string;
    COSTO?: number;
    imageURL?:string;
    stars?:number;
    favorite?:boolean;
    tags?:string[];
    precio?:number;
    iva?:number;
    constructor(
      ID_PRODUCTO: number,
      CODIGOPRINCIPAL: string,
      NOMBRE: string,
      PRECIOSINIVA: number,
      STOCK?: number,
      BODEGA?: string,
      CATEGORIA?: string,
      ESTADO?: string,
      COD_AUXILIAR?: string,
      PESO?: number,
      TIPO_SOLUCIONES?: string,
      CONTROL_SERIES?: string,
      SUBCATEGORIA?: string,
      UNIDAD_MEDIDA?: string,
      MARCA?: string,
      MODELO?: string,
      COSTO?: number,
      imageURL?:string,
      stars?:number,
      favorite?:boolean,
      tags?:string[],
      precio?:number,
      iva?:number,
    ){
      this.ID_PRODUCTO=ID_PRODUCTO
      this.CODIGOPRINCIPAL=CODIGOPRINCIPAL
      this.NOMBRE=NOMBRE
      this.PRECIOSINIVA=PRECIOSINIVA
      this.STOCK=STOCK
      this.BODEGA=BODEGA
      this.CATEGORIA=CATEGORIA
      this.ESTADO=ESTADO
      this.COD_AUXILIAR=COD_AUXILIAR
      this.PESO=PESO
      this.TIPO_SOLUCIONES=TIPO_SOLUCIONES
      this.CONTROL_SERIES=CONTROL_SERIES
      this.SUBCATEGORIA=SUBCATEGORIA
      this.UNIDAD_MEDIDA=UNIDAD_MEDIDA
      this.MARCA=MARCA
      this.MODELO=MODELO
      this.COSTO=COSTO
      this.imageURL=imageURL
      this.stars=stars
      this.favorite=favorite
      this.tags=tags
      this.precio=precio
      this.iva=iva
    }
    

    
  }

  export interface BodegaResponse {
    success: boolean
    dataResponse: ProductoModel[]
    mensaje: string
  }