import { BufferAttribute, BufferGeometry, Line, LineBasicMaterial, Material, Raycaster, Vector2 } from "three";

class Picker {
    private geometry:BufferGeometry;
    private material:Material;
    private line:Line;

    private raycaster:Raycaster;
    private pointer:Vector2;
    
    constructor(){
        this.geometry = new BufferGeometry();
        this.geometry.setAttribute( 'position', new BufferAttribute( new Float32Array( 4 * 3 ), 3 ) );
		this.material = new LineBasicMaterial( { color: 0xffffff, transparent: true } );
        this.line = new Line( this.geometry, this.material );
        
        this.raycaster = new Raycaster();
        this.pointer = new Vector2();
    }
    render() {

    }

    public updatePointer(event:MouseEvent){
        event.preventDefault();
    }

}