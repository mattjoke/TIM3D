# Three JS Manual

This repo contains source code for this project. 
GitHub Workflow automatically deploys latest push to GitHub pages.
- https://mattjoke.github.io/ThreeJS-library/

Trello with ToDo (view-only:
- https://trello.com/b/hXZva22f/threejs-library-to-do

## Basic usage
*This usage is subject to change*

    const data = {
        files: [
            {
                file: "models/files/Bar1.stl",
                color: "yellow",
                name: "1",
            },
            {
                file: "models/files/Bar2.stl",
                color: "orange",
                name: "2",
            },
            {
                file: "models/files/Bar3.stl",
                color: "#192833",
                name: "3",
            },
            {
                file: "models/files/Bar4.stl",
                name: "4",
            },
            {
                file: "models/files/Base_gr.stl",
                name: "5",
            }
        ],
        steps: [
            {
                name: "Init",
                positions: [
                    {
                        name: "1",
                        position: new Vector3(10, 10, 10),
                    },
                ],
            },
            {
                name: "First Step",
                positions: [
                    {
                        name: "1",
                        position: new Vector3(7, 7, 7),
                    },
                ],
            },
            {
                name: "Second Step",
                positions: [
                    {
                        name: "1",
                        position: new Vector3(5, 10, 10),
                    },
                ],
            },
        ],
    };

    const config = {
        container: document.getElementById("third"),
        color: "#123456",
    };


    const t2 = new Init(config); 
    t2.withJSON(data);

## Classes
Main class the user will interact is currently *Init* class, this will likely change with added Observer/Factory class.

### High level look at the classes

This image contains basic high-level look on the class scheme (updated 30.9.2021)
![Image of model](./static/model.png)

## Factory
This class is basic interface for developers.
### Properties
* *private* instance - contains current instance of Init class

* *public* objectsLoaded - changed to true after successful call of *loadJSON* function 
### Functions
* *public async* loadJSON(json: JSON) - loads and places objects to scene

* *public* selectItem(id: ObjectID) - returns instance of Object3D (contains loaded geometry, visible mesh and outline mesh)

* *public* moveToStep(stepNumber: number) - moves Stepper instance to specified step and syncs it with Overlay

* *public* on(selector: ObejctID, event: string, callback: Function) - adds callbacks to object specified with selector.

* *public* group(event: string, callback: Function) - adds callback for ALL objects on specified event. 

## Init

Handles Window, Overlay, Stepper and Object initialization
### Properties
* *private* window: Window;
* *private* overlay: HTMLDivElement;
* *private* stepper: Stepper | undefined;
* *private* objects: Objects3D;
### Functions
* *public* initPlane()
* *private* initAxes()
* *public* async withJSON(json: JSON) - handles loading with JSON
* *private* checkConfig(config: Config)
* *public* getObjects()
* *public* getStepper()
* *public* setStep(stepNumber: number)

## Loader
Fuction, that loads models specified by input JSON.
Also loads Loader Overlay, which is only HTML Element (showed when models are loading).

Returns: Objects3D - Map containing loaded models

## Overlay 
Function, that initializes Overlay/Menu of the window

Input parameters: instance of Stepper, instance of Window

Returns: HTMLDivElement, containing Initialized stepper

## Axis (currently broken)
Function, that initializes axes.

Returns: Computed axes.

## Stepper

Class that initializes steps and handles redrawing on positions specified in JSON.

### Properties
* *private* objects: Objects3D;
* *private* currentStep: StepOfManual;
* *private* currentStepPosition: number;
* *public* length: number;

### Functions
* *private* redraw() 
* *public* setStep(position: number) - sets stepper for specific step
* *public* moveStepUp() 
* *public* moveStepDown()
* *public* getCurrentStep()

## StepOfManual
Sub-class of Stepper. Is used as building block for linked list of Steps.
### Properties
* prev: StepOfManual | null
* next: StepOfManual | null
* name: string;
* positions: Position[]

## Window
Initializes and handles actual drawing to div.
### Properties
* #### Window specific
    * *public* scene: Scene;
    * *private* renderer: WebGLRenderer;
    * *private* camera: PerspectiveCamera;
    * *public* container: HTMLElement;
* #### Control/selection specific
    * *private* orbitalControls: OrbitControls;
    * *private* mouse: Vector2;
    * *private* raycaster: Raycaster;
* #### Animation specific
    * *private* animators: any[]

### Functions
* *public* resetCamera()
* *public* getCamera()
* *public* getDomRect()
* *private* onWindowResize() 
* *public* addObject(...objects: Object3D[]) - adds object/s to scene
* *private* selectObject(position: inputPosition, canvas: DOMRect) - shoots ray and calculates selection of item
* *private* animate()

Other classes are used from ThreeJS library.