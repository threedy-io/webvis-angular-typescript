declare module webvis
{


export interface AnimationAPI {
    createAnimationFrames(name: string, frames: Array<AnimationFrame>): void;
    removeAnimationFrames(name: string): void;
    animate(nodeID: number, name: string, options: AnimationOptions): void;
}

export interface IAnnotationData {
    nodeID: number;
    label: string;
    visible: boolean;
    active: boolean;
    explicitOffset: boolean;
    anchorPosition: Float32Array;
    labelPosition: Float32Array;
    transform: Float32Array;
    trustedSource: boolean;
}
/**
 * These functions allow the management of Annotations
 */
export interface AnnotationAPI {
    createAnnotation(nodeID: number, label: string, visible?: boolean, anchorPosition?: Float32Array | Array<number>, labelOffset?: Float32Array | Array<number>): number;
    changeAnnotation(annotationID: number, label?: string, visible?: boolean, anchorPosition?: Float32Array | Array<number>, labelPosition?: Float32Array | Array<number>, active?: boolean, transform?: Float32Array | Array<number>): void;
    removeAnnotation(annontationID: number): void;
    getAnnotationData(annotationID: number): IAnnotationData;
    /**
     * Returns the ids of all available annotations
     * @returns {Array<number>} The ids of all available annotations
     */
    getAnnotations(): Array<number>;
}


export type Attachment = {
    id: number;
    type: AttachmentType;
    uri?: string;
    data?: any;
};


/**
 * With the Attachment API you can access additional to a node attached data.
 */
export interface AttachmentAPI {
    /**
     * Creates a new Attachment
     *
     * @param {ResponseType} [dataType] Specifies the attachment data type
     * @return {number} The attachment id
     */
    createAttachment(dataType: AttachmentType): number;
    /**
     * Removes an existent Attachment
     *
     * @param {number} The attachment id.
     */
    removeAttachment(attachmentID: number): void;
    /**
     * Fetches & Returns the attachment data
     *
     * @param {number} [attachmentID] Specifies the attachment object
     * @return {Promise<any>} The attached data
     */
    fetchAttachmentData(attachmentID: number): Promise<any>;
    /**
     * Returns the attachment data
     *
     * @param {number} [attachmentID] Specifies the attachment object
     * @return {Promise<any>} The attached data
     * @deprecated Will be removed in the Future. Use fetchAttachmentData instead.
     */
    getAttachmentData(attachmentID: number): any;
    /**
     * Set the attachment data
     *
     * @param {number} [attachmentID] Specifies the attachment object
     * @param {any} [data] The attachment data update
     */
    setAttachmentData(attachmentID: number, data: any): void;
    /**
     * Returns the attachment data URI
     *
     * @param {number} [attachmentID] Specifies the attachment object
     */
    getAttachmentDataURI(attachmentID: number): string;
    /**
     * Sets the attachment data URI
     *
     * @param {number} [attachmentID] Specifies the attachment object
     * @param {string} [dataURI] The attachment data URI
     */
    setAttachmentDataURI(attachmentID: number, dataURI: string): void;
}

export enum AttachmentType {
    TEXT = "text",
    JSON = "json",
    ARRAYBUFFER = "arraybuffer",
    BLOB = "blob",
    DOCUMENT = "document"
}

/**
 * With the AUX API you can access additional information about loaded aux node.
 */
export interface AuxAPI {
    /**
     * @deprecated This function will no longer be available in future webVis releases
     * </br>
     * </br>
     *
     * Traverses the subtree of a given nodeID and collects all enabled aux nodes.
     *
     * @param {number} [nodeID=0] Specifies the entry point of the subtree traversal (default: 0)
     * @return {Promise<Array<number>>} An Array of all enabled aux node ID's
     */
    getEnabledAuxNodes(nodeID: number): Promise<Array<number>>;
}

export enum BoosterConnectionState {
    INIT = 0,
    IGNORED = 1,
    FAILED = 2,
    CONNECTING = 3,
    CONNECTED = 4
}
export interface BoosterAPI {
    getBoosterConnectionState(): BoosterConnectionState;
    sendToBooster(message: string): void;
}


export interface IClipPlaneBase {
    id: number;
    name: string;
    type: NodeType;
    disabled: boolean;
}
/**
 * Clip planes are used to spatially exclude parts of the geometry from the visualization
 * by defining a separating plane.
 */
export interface ClipPlaneAPI {
    /**
     * Creates a clip plane defined by the plane’s normal, positioned at an optional point (otherwise at
     * the world space origin) and an optional name. Returns the ID of the clip plane.
     *
     * @param normal The normal of the clip plane
     * @param point  An arbitrary point in space which lies on the clip plane
     * @param name   The name of the clip plane
     * @param thickness   The thickness of the clip plane
     * @param tangent   The tangent of the clip plane
     * @param disabled   The state of the clip plane
     * @param invisible   Invisible on the UI
     * @param exclusive   set the exclusive flag to clip geometry when using exclusiveClipplanes property
     *
     * @returns      The ID of the newly created clip plane
     */
    createClipPlane(normal?: Float32Array | Array<number>, point?: Float32Array | Array<number>, name?: string, thickness?: number, tangent?: Float32Array | Array<number>, disabled?: boolean, invisible?: boolean, exclusive?: boolean): number;
    /**
     * Changes the properties of the clip plane defined by the clipPlaneID with the optional parameters
     * normal, points and name.
     *
     * @param clipPlaneID The ID of an existing clip plane which should be changed
     * @param normal      The new normal of the clip plane
     * @param point       An arbitrary new point in space which lies on the clip plane
     * @param name        The new name for the clip plane
     * @param thickness   The thickness for the clip plane
     * @param tangent     The tangent of the clip plane
     * @param disabled    The enabled state of the clip plane
     * @param invisible   Invisible on the UI
     * @param exclusive   set the exclusive flag to clip geometry when using exclusiveClipplanes property
     */
    changeClipPlane(clipPlaneID: number, normal?: Float32Array | Array<number>, point?: Float32Array | Array<number>, name?: string, thickness?: number, tangent?: Float32Array | Array<number>, disabled?: boolean, invisible?: boolean, exclusive?: boolean): void;
    /**
     * Removes the clip plane for the given clipPlaneID.
     *
     * @param clipPlaneID The ID of the clip plane which should be removed
     */
    removeClipPlane(clipPlaneID: number): void;
    /**
     * Creates six clip planes around the bounding box of the specified node.
     *
     * @param nodeID The ID of the node from which the bounding box is used to create 6 clip planes
     */
    createClippingRoom(name?: string, size?: Float32Array | Array<number>, transformation?: Float32Array | Array<number>, disabled?: boolean, invisible?: boolean): number;
    changeClippingRoom(name?: string, size?: Float32Array | Array<number>, transformation?: Float32Array | Array<number>, disabled?: boolean, invisible?: boolean): void;
    removeClippingRoom(): void;
    clipOtherParts(target: number | Array<number>): void;
    createCapping(clipPlaneID: number): Promise<void>;
    enableCapping(clipPlaneId: number): Promise<void>;
    disableCapping(clipPlaneId: number): Promise<void>;
    removeCapping(clipPlaneId: number): Promise<void>;
}


export interface ICollection {
    clear(): void;
    forNodes(callback: (nodeID: number) => Promise<any>): Promise<any>;
    forRootNodes(callback: (nodeID: number) => Promise<any>): Promise<any>;
    copy(other: ICollection): void;
    getNodeCount(): number;
}
/**
 * Collections store groups of nodes. Collections can be created empty or from a list of nodes.
 * Collections can also be created by searching nodes matching a given property.
 */
export interface CollectionAPI {
    /**
     * Returns the ID of a new Collection containing the nodes from the given list.
     *
     * @param nodeIDlist An array of node ID's from which a new node collection should be created
     *
     * @return           The ID from the newly created node collection
     */
    createCollection(nodeIDlist?: Array<number>): number;
    removeCollection(collectionID: number): void;
    getCollection(collectionID: number): ICollection;
    /**
     * Creates a new, empty Collection of nodes and returns its ID.
     *
     * @return The ID from the newly created collection
     */
    createCollection(): number;
    /**
     * Finds nodes within the given BoxVolume (created using the createBoxVolume() function).
     * If includeOverlappingNodes is false, only nodes fully contained by the box volume are returned.
     * The rootNodeID specifies the node from which the subtree is searched.
     *
     * @param  selectionBox            3-dimensional search volume
     * @param  includeOverlappingNodes Specifies whether the search result contains only those nodes which lie entirely in the search volume or if overlapping nodes are also included
     * @param  rootNodeID              Restricts the search to a subtree of a node with the given ID
     *
     * @return                         The search result is a collection whose ID is returned by the search function
     */
    searchByVolume(selectionBox: BoxVolume, includeOverlappingNodes: boolean, rootNodeID?: number): Promise<number>;
    /**
     * Adds the Node given by nodeID to the collection with ID collectionID. If recursive is true,
     * the descendants of the node are also added. Returns the  number of nodes in the collection.
     *
     * @param  collectionID Specifies to which collection the node should be added
     * @param  nodeID       Specifies which node should be added to the collection
     * @param  recursive    Specifies if the children of the node should also be added to the collection
     *
     * @return              The new number of nodes in the collection
     */
    addToCollection(collectionID: number, nodeID: number, recursive?: boolean): void;
    /**
     * Removes the Node given by nodeID from the collection with ID collectionID. If recursive is true,
     * the descendants of the node are also removed. Returns the number of nodes in the collection.
     *
     * @param  collectionID Specifies from which collection the node should be removed
     * @param  nodeID       Specifies which node should be removed from the collection
     * @param  recursive    Specifies whether the children of the node should be removed from the collection too
     *
     * @return              The new number of nodes in the collection
     */
    removeFromCollection(collectionID: number, nodeID: number, recursive?: boolean): void;
    /**
     * Returns a JavaScript array containing the IDs of the nodes in the collection.
     * Modifying the returned array results in undefined behavior.
     *
     * @READONLY
     *
     * @param  collectionID The ID of the node collection
     *
     * @return              Array of node IDs representing the node collection
     */
    getCollectionElements(collectionID: number): Promise<Array<number>>;
    getCollectionNodeCount(collectionID: number): Promise<number>;
}

































export interface IRenderSetup {
    parameters: {
        [key: string]: any;
    };
    name: string;
    settings: any;
    tag: string;
}
export interface IRenderSetupList {
    getByIndex(index: number): IRenderSetup;
    getRenderSetupByNameOrTag(identifier: string): IRenderSetup;
    getCount(): number;
}
export interface ContextAPI extends AnnotationAPI, AuxAPI, BoosterAPI, ClipPlaneAPI, CollectionAPI, ExplosionAPI, NetworkAPI, InstanceGraphAPI, InteractionStateAPI, LayerFilterAPI, ListenerRegistrationAPI, MeasurementAPI, NotificationAPI, QueryAPI, ResourceAPI, SelectionAPI, ServiceProviderAPI, SessionAPI, SessionTrackingAPI, SettingsAPI, SessionStorageAPI, ShapeTopologyAPI, UtilityAPI, ContextMenuAPI, AttachmentAPI, AnimationAPI, NodePathAPI, FrameAPI, RealityAPI {
    getID(): string;
    createViewer(viewerID?: string, canvas?: HTMLCanvasElement): ViewerAPI;
    removeViewer(viewer: ViewerAPI): void;
    getViewers(): Array<ViewerAPI>;
    getViewer(id?: string): ViewerAPI;
    getRenderSetupList(): IRenderSetupList;
    about: VersionInfo;
}


export interface IContextMenuEntry {
    id?: string;
    label?: string;
    description?: string;
    iconID?: string;
    condition: (nodeID: number, clickResult: IClickResult) => boolean;
    command?: (nodeID: number, clickResult: IClickResult) => void;
    highlight?: (nodeID: number, clickResult: IClickResult) => void;
    subEntries?: Array<IContextMenuEntry>;
}
export interface IContextMenuData {
    leftPos: number;
    topPos: number;
    targetID?: number;
    clickResult?: IClickResult;
    contents?: Array<IContextMenuEntry>;
    onCloseCallback?: () => void;
}
export interface ContextMenuAPI {
    requestContextMenu(provider: any, menuData: IContextMenuData): void;
}

export interface ExplosionAPI {
    createExplosion(centerNodeID?: number): void;
    performExplosion(explosionFactor: number): void;
    endExplosion(): void;
}

export interface FrameAPI {
    /**
     * Registers a frame listener which get called every frame.
     * @param listener { (time : number, elapsed: number) => void }
     */
    registerFrameListener(listener: (time: number, elapsed: number) => void): void;
    /**
     * Unregisters a previous registered frame listener
     * @param listener { (time : number, elapsed: number) => void }
     */
    unregisterFrameListener(listener: (time: number, elapsed: number) => void): void;
}

export interface IWebVisWebSocket {
    onMessage(callback: (message: MessageEvent) => void): void;
    onOpen(callback: (event: Event) => void): void;
    onClose(callback: (message: CloseEvent) => void): void;
    onError(callback: (error: any) => void): void;
    send(message: string | ArrayBuffer): void;
    close(code?: number, message?: string): void;
    getReadyState(): number;
    setBinaryType(type: BinaryType): void;
}

/**
 * With the Instance Graph API the content of webVis can be controlled and manipulated. It resembles a scene graph
 * like tree structure of nodes. Every node can contain links to 3D geometry and/or group other nodes.
 * <br>
 *
 * The get- and set-Property functions allow setting and retrieving properties of arbitrary type on the nodes.
 * Properties are used to modify any node dependent data like color, local transformation, etc. There is a set of
 * predefined node properties that webVis will react on, but the surrounding application might add
 * any other property to the nodes.
 */






export interface InstanceGraphAPI {
    /**
     * Loads the resource behind the given dataURI and returns the ID of the new contents root node. . .
     *
     * The default is <code>closed</code>.
     * <code>open</code> - Adds the data in an expanded state. Granularity is set to the leaf-level of the data.<br>
     * <code>closed</code> - Adds the data as a single node. Granularity is set to the root-level. Can be expanded afterwards by traversing the tree.<br>
     *
     * @param  dataURI     Specifies the URI of the data resource
     * @param  parentID    By specifying a parentID the resource can be added to an arbitrary node instead of the tree root
     * @param  usage       The usage parameter allows to define how the resource should be inserted in the instance graph as described in the next table
     * @param  label       label can be used to set a string that is shown in the UI as a name of the node
     * @param  contentType With contentType the type of the input data can be specified with a MimeType or any other descriptor
     * @param  initialProperties A map of properties to initialize the new node
     *
     * @return             The ID of the new contents root node
     */
    add(dataURI: string, parentID?: number, usage?: UsageString, label?: string, contentType?: string, initialProperties?: {
        [key: string]: any;
    }): number;
    /**
     * Variant of the add function, accepting a params object instead of explicit parameters. The params object is a
     * map from parameter names to parameter values.
     */
    add(params: {
        [key: string]: any;
    }): number;
    /**
     * Creates a custom node with custom data which is stored in an attachment
     *
     * @param  customNodeType {string}          Specifies the custom node type
     * @param  data {any}                       Specifies the data of the custom node
     * @param  dataType {AttachmentType="json"} Specifies the type of the data
     */
    addCustomNode(customNodeType: string, data: any, dataType?: AttachmentType): number;
    /**
     * Removes the node for the given nodeID from the tree.If no nodeID is supplied all nodes are deleted.
     *
     * @param nodeID The ID of the node that should be removed
     * @param The silent flag indicates that no NODE_REMOVED_EVENT event is fired
     */
    remove(nodeID?: number | Array<number>, silent?: boolean): Promise<void>;
    /**
     * Sets the property named <i>property</i> to <i>value</i>  on the node with id <i>nodeID</i>. The <i>recursive</i>
     * flag, if specified as true, allows the user to set a property for a whole subtree with one API call.
     * If the <i>recursive</i> flag is not specified, a property-specific default value is used (see property table).
     * For custom properties, the default value is <i>false</i>.
     *
     * @param nodeID    The ID of the node whose property has to be set
     * @param property  The name of the property that has to be set
     * @param value     The new value of the specified property
     * @param silent    The silent flag indicates that no NODE_CHANGED event is fired
     */
    setProperty<T extends PropertyName>(nodeID: number | Array<number>, property: T, value: any, silent?: boolean): Promise<SetPropertyResults>;
    /**
     * Sets the property named <i>property</i> to <i>value</i> on all nodes in the collection with id <i>collectionID</i>.
     * The <i>recursive</i> flag, if specified as true, allows the user to set a property for a whole subtree
     * with one API call. If the <i>recursive</i> flag is not specified, a property-specific default value
     * is used (see property table). For custom properties, the default value is <i>false</i>.
     *
     * @param collectionID The ID of collection of nodes whose property has to be set
     * @param property     The name of the property that has to be set
     * @param value        The new value of the specified property
     * @param silent       The silent flag indicates that no NODE_CHANGED event is fired
     */
    setProperty<T extends PropertyName>(collectionID: number, property: T, value: any, silent?: boolean): Promise<SetPropertyResults>;
    /**
     * Sets the property named <i>property<i/> to <i>value<i> on all nodes and collections specified in the <i>idLIst<i/> .
     * The <i>recursive</i> flag, if specified as true, allows the user to set a property for a whole subtree with
     * one API call. If the <i>recursive<i/> flag is not specified, a property-specific default value
     * is used (see property table). For custom properties, the default value is <i>false</i>.
     *
     * @param idList    An ID List of nodes whose property has to be set
     * @param property  The name of the property that has to be set
     * @param value     The new value of the specified property
     * @param silent    The silent flag indicates that no NODE_CHANGED event is fired
     */
    setProperty<T extends PropertyName>(idList: Array<number>, property: T, value: any, silent?: boolean): Promise<SetPropertyResults>;
    /**
     * Returns the value of the property on the node with the matching id.
     *
     * @param nodeID   The ID of the node whose property should be read
     * @param property The name of the property whose value should be read
     *
     * @return         The retrieved value of the node property
     */
    getProperty<T extends PropertyName>(nodeID: number, property: T): Promise<PropertyType<T>>;
    /**
     * Resets the value of the property on the node with the matching id.
     *
     * @param nodeID   The ID of the node whose property should be reset
     * @param property Property which should be reset
     */
    resetProperty(nodeID: number, property: PropertyName): Promise<void>;
    /**
     * Resets the value of the specified properties on the given node.
     *
     * @param nodeID   The ID of the node whose property should be reset
     * @param property List of properties which should be reset
     */
    resetProperties(nodeID: number, properties: Array<PropertyName>): Promise<void>;
    /**
     * Returns the values of the properties on the node with the matching id.
     *
     * @param nodeID   The ID of the node whose properties should be read
     * @param properties The names of the properties whose value should be read
     *
     * @return         The retrieved values of the node's properties
     */
    getProperties<T extends PropertyName>(nodeID: number, properties: Array<T>): Promise<Array<PropertyType<T>>>;
    /**
     * Traverses the subtree of a given nodeID and collects all statistics (currently only available for AUX-Nodes).
     *
     * @param {NodeType} [nodeType=NodeType.ALL] Specifies the target node type.
     * @param {number} [nodeID=0] Specifies the entry point of the subtree traversal (default: 0)
     * @return {Promise<any>} An Object of Type/Count pairs
     */
    getStatistics(nodeType?: NodeType, nodeID?: number): Promise<any>;
    /**
     * Registering a new custom property
     *
     * @param {string} name The name of the new property
     * @param {any} defaultValue Specifies the default value
     * @param {boolean} recursive Defines whether the property is recursive
     */
    registerCustomProperty(name: string, defaultValue: any, recursive?: boolean): void;
    /**
     * collectRuntimeNodesOfType
     *
     * @param {NodeType} nodeType The node type to collect
     * @param {string} [subType=undefined] The sub type to collect. Only used for Custom-Nodes
     * @return {Array<number>} Array of node ids of the specified type
     */
    collectRuntimeNodesOfType(nodeType: NodeType, subType?: string): Array<number>;
    setParent(nodeID: number, newParentID: number): void;
    /**
     * Returns if a node is deletable
     * @READONLY
     * @return of the node is deletable
     */
    isNodeDeletable(nodeID: number): boolean;
    /**
     * Checks the node's type for the given node id.
     * @READONLY
     * @return boolean
     */
    isNodeType(nodeID: number, nodeType: NodeType): boolean;
    invertEnabledStates(): void;
}


export enum InteractionType {
    PICKING = 0,
    BY_ID = 1
}
export enum InteractionModifier {
    DEFAULT = 0,
    ADD = 1,
    EXPAND = 2,
    MULTI_SELECT = 3,
    SECONDARY = 4
}
export interface InteractionData {
    targetID: number;
    type?: InteractionType;
    lastSelectedNodeID?: number;
    targetName?: string;
    clickResult?: IClickResult;
    modifier?: InteractionModifier;
    originalEvent?: Event;
    origin?: any;
    color?: Float32Array;
    viewer?: ViewerAPI;
}
export enum SnappingTarget {
    PICKED_POSITION = 0,
    VERTEX = 1,
    EDGE = 2,
    FACE = 3,
    SHAPE = 4,
    COUNT = 5
}
export enum InteractionMode {
    NONE = 0,
    DEFAULT = 1,
    SELECTION_TRANSFORMATION = 2,
    MEASUREMENT = 3,
    CLIP_PLANE = 4,
    EXPLOSION = 5,
    COLOR_COMPARISON = 6,
    SELECTION = 7,
    AUX = 8,
    PAINT = 9
}
export enum InteractionProgress {
    WAITING_FIRST_INPUT = 0,
    WAITING_SECOND_INPUT = 1,
    WAITING_THIRD_INPUT = 2,
    DONE = 3
}
export interface ISnappingFilters {
    isTargetEnabled(target: SnappingTarget): boolean;
    setTargetEnabled(target: SnappingTarget, enabled: boolean): void;
    getPriorityTarget(): SnappingTarget;
}
export interface IInteraction {
    getIdentifier(): string;
    setMode(mode: string): void;
    getMode(): string;
    processInteraction(data: InteractionData): void;
    reset(): void;
    setActive(flag: boolean): void;
    isActive(): boolean;
}
export interface InteractionStateAPI {
    setInteractionMode(modeSelection: string | Array<string> | any): void;
    getInteractionMode(): string;
    getInteractionSubMode(): string;
    setInteractionProgress(progress: InteractionProgress): void;
    resetInteractionMode(): void;
    resetInteractionProgress(): void;
    processInteractionClickInput(clickResult: IClickResult, modifier?: InteractionModifier, originalEvent?: Event): void;
    processInteractionInput(interactionData: InteractionData): void;
    getSnappingFilters(): ISnappingFilters;
    getInteractionProgress(): InteractionProgress;
    getAllInteractionData(): Array<InteractionData>;
    getInteractionDataCount(): number;
    getLastInteractionData(): InteractionData;
    removeLastInteractionData(): void;
    removeInteractionData(idx: number): void;
}


export interface LayerFilterAPI {
    /**
     * Returns the currently defined list of layer filters
     *
     * @return Returns the registered layer filters and there states
     */
    getRegisteredLayerFilters(): {
        [key: string]: boolean;
    };
    /**
     * Returns the currently defined list of enabled layer filters
     *
     * @return An Array of strings representing the names of the enabled filters
     */
    getEnabledLayerFilters(): Array<string>;
    /**
     * Sets layers to enabled whose names are in the array of names
     *
     * @param layerFilters An array which contains the names of the filters which should be set to enabled
     */
    setEnabledLayerFilters(layerFilters: Array<string>): void;
    /**
     * Sets layers to enabled whose names are in the array of names
     *
     * @param name The name of the layerfilter
     * @param enabled The new enabled state
     */
    setLayerFilterEnabled(name: string, enabled: boolean): SetLayerFilterEnabledResult;
    /**
     * Return if the specified node id is part of an enbled layer
     *
     * @param nodeID The node id which should be checked
     */
    isNodePartOfEnabledLayers(nodeID: number): Promise<boolean>;
}



export interface IEventListener {
    (event: WebVisEvent): void;
}
/**
 * These functions allow adding and removing listeners to be able to react to events on arbitrary nodes.
 */
export interface ListenerRegistrationAPI {
    /**
     * Registers the <code>listener</code> to the node with the matching <code>nodeID</code> and returns
     * the id of the listener. The <code>observeSubTree</code> flag allows to observe the whole subtree under the
     * respective node with the <code>listener</code>. With the <code>eventTypes</code> array, you can specify the
     * types of events the listener should be reacting on. If an empty array is passed, the listener will react on
     * all event types.
     *
     * @param eventTypes     The kind of events on which the event listener should listen
     * @param listener       The event listener
     * @param nodeID         The ID of the node on which the event listener should be registered
     * @param observeSubTree Indicates wether the event listener should also listen to events in all child nodes
     *
     * @return               The ID of the event listener
     */
    registerListener(eventTypes: Array<EventType>, listener: IEventListener, nodeID?: number, observeSubTree?: boolean): number;
    /**
     * Removes the listener for the given <code>listenerID</code>.
     *
     * @param listenerID The ID of the event listener that should be unregistered
     */
    unregisterListener(listenerID: number): void;
    induceEvent(nodeID: number, event: WebVisEvent, recursive?: boolean): void;
}



export enum MeasurementType {
    SINGLE = 0,
    MULTIPLE = 1,
    ARC = 2,
    BBOX = 3
}
export enum MeasurementResultType {
    PICKED_POSITION = 0,
    VERTEX = 1,
    EDGE = 2,
    FACE = 3,
    SHAPE = 4,
    DISTANCE = 5,
    ANGLE = 6
}
export enum MeasurementProgress {
    INTERACTING = 0,
    PROCESSING = 1,
    DONE = 2,
    FAILED = 3,
    NO_MORE = 4,
    UNKNOWN = 5
}
export enum MeasurementTargetType {
    group = 0,
    node = 1,
    shape = 2,
    edge = 3,
    face = 4,
    point = 5,
    line = 6,
    plane = 7,
    normal = 8
}
export type MeasurementData = {
    type: MeasurementType;
    name: string;
    visible: boolean;
    progress: MeasurementProgress;
    primary: Array<ITopologyDataEntry>;
    secondary: Array<ITopologyDataEntry>;
    expanded: boolean;
    topoSourceString: string;
    measurementDescriptors?: Array<MeasurementDescriptor>;
    generatedPoints: Array<Float32Array>;
    lineValues: number[][];
    anchorPoint: Float32Array;
    labelPoint: Float32Array;
    normal: Float32Array;
    measurementLines: Array<IMeasurementLine>;
};
export type IMeasurementData = MeasurementData;
export interface MeasurementDescriptor extends ITopologyDataSelector {
    name: string;
    position: Float32Array;
    value: any;
    l3dShapeInstanceGlobalIdMap?: Map<number, Array<number>>;
    target: MeasurementTargetType;
}
export interface IMeasurementLine {
    startPoint: Float32Array;
    endPoint: Float32Array;
    style: string;
}
export interface ArcMeasurementInfo {
    points: Float32Array[];
}
export interface ITangentMeasurementResult {
    result: string;
    direction: Array<number>;
    error: string;
}
/**
 * These functions allow the creation of Measurements. A Measurement describes the distance between two points in the world.
 */
export interface MeasurementAPI {
    /**
     * Creates a new measurement and returns the ID. If no name is given, the measurement will be
     * automatically named (e.g., “Measurement 23”).
     * @param {MeasurementType} type
     * @param {IClickResult} clickResult
     * @param {string} name
     * @param {Float32Array} anchorPosition
     * @param {Float32Array} labelOffset
     * @returns {number}
     */
    createMeasurement(type: MeasurementType, clickResult1: IClickResult, clickResult2?: IClickResult, name?: string): number;
    changeMeasurement(measurementID: number, progress: MeasurementProgress, visible?: boolean, name?: string): void;
    getMeasurementData(measurementID: number): MeasurementData;
    /**
     * Returns the ids of all available measurements
     * @returns {Array<number>} The ids of all available measurements
     */
    getMeasurements(): Array<number>;
    restoreMeasurement(data: IMeasurementData, measurementID?: number): number;
    requestAdditionalMeasurementData(measurementID: number): void;
    /**
     * The measurement for the given measurementID is removed.
     * @param measurementID
     */
    removeMeasurement(measurementID: number): void;
    measureTangent(measurementDescriptor: MeasurementDescriptor, l3dToShapeInstanceIDMap: Map<number, Array<number>>): Promise<ITangentMeasurementResult>;
}


export interface NetworkAPI {
    doRequest(url: string, responseType: string, callback: (data: any, byteCount: number) => void, errorCallback?: (statusCode: number) => void, postContent?: string, postContentType?: string, priority?: number): void;
    createWebSocket(uri: string): IWebVisWebSocket;
    fetchContent(dataURI: string, responseType?: string, postContent?: string, postContentType?: string): Promise<any>;
}


/**
 * Node Path Fragments can consist of
 */
export enum NodePathFragmentType {
    LOCAL_ID = 0,
    LEAF_INDEX = 1,
    LINK_INDEX = 2
}
/**
 * Interface provided
 */
export interface INodePathHandle {
    nodeID: number;
    selector?: ITopologyDataSelector;
}
/**
 * An object mapping from node path strings to the respective handles.
 */
export type NodePathHandleMap = {
    [key: string]: INodePathHandle;
};
export interface NodePathAPI {
    /**
     * requestNodePathHandleMap Returns an object mapping from input paths to the respective handles
     *
     * @param paths {Array<string | INodePathHandle>} The array of node path strings or handles
     * @param scope {number} [scope=0] Node id specifying the scope as starting point for the paths
     * @return {Promise<NodePathHandleMap>} The resulting object mapping paths to handles
     */
    requestNodePathHandleMap(paths: Array<string>, scope?: number): Promise<NodePathHandleMap>;
    /**
     * createNodePathHandles Creates and returns handles for the target node ids or topology selectors.
     *
     * @param targets {Array<number | ITopologyDataSelector>} Array of target node ids or handles to create the handles for
     * @return {Promise<Array<INodePathHandle>>} The array of handles
     */
    createNodePathHandles(targets: Array<number | ITopologyDataSelector>): Promise<Array<INodePathHandle>>;
    /**
     * requestNodePathStrings Returns string representations for the respective node path handles.
     *
     * @param handles {Array<INodePathHandle>}
     * @param [scope=0] {number} Node id specifying the scope as starting point for the path resolution
     * @param typePriorities {Array<NodePathFragmentType>} Array of  priorities to control the fragments for the path string assembly.
     * @return {Promise<Array<string>>} String representation of the node path for the respective scope.
     */
    requestNodePathStrings(handles: Array<INodePathHandle>, scope?: number, typePriorities?: Array<NodePathFragmentType>): Promise<Array<string>>;
}

export interface NotificationAPI {
    postTrace(msg: string, ...args: any[]): string;
    postDebug(msg: string, ...args: any[]): string;
    postInfo(msg: string, ...args: any[]): string;
    postWarning(msg: string, ...args: any[]): string;
    postError(msg: string, sendToServer?: boolean, ...args: any[]): string;
    postFatal(msg: string, ...args: any[]): string;
}


/**
 * @hidden
 */
export type QueryResult = {
    data: Array<any>;
    errors: Array<any>;
};
export type QueryCondition = {
    nodeId?: number;
    originalFaceID?: number;
    ancestors?: Array<QueryCondition>;
    extFaceLink?: string;
    nodeType?: "structure" | "aux";
    metadata?: string;
    equals?: Query | string | number;
    equalsAny?: Array<string>;
    contains?: any;
    lessThan?: number;
    lessOrEqualThan?: number;
    greaterThan?: number;
    greaterOrEqualThan?: number;
    caseSensitive?: boolean;
    pointsTo?: number;
    linkDepth?: number;
    faceHandle?: ITopologyDataSelector;
    not?: Array<QueryCondition>;
    and?: Array<QueryCondition>;
    or?: Array<QueryCondition>;
};
export type QuerySelect = "nodeId" | "ancestor.nodeId" | "ancestor.metadata" | "ancestor.metadata.*" | "structId" | "auxId" | "shapeId" | "faceInstanceId" | "edgeInstanceId" | "pointInstanceId" | "property" | "metadata" | "nodeType" | "subtreeRootId" | string;
export type Query = {
    select: Array<QuerySelect>;
    conditions: Array<QueryCondition>;
    linkDepth?: number;
};
export type BatchedQuery = {
    caches: {
        [key: string]: Array<Array<number>>;
    };
    query: Query;
};
/**
 * With the Query API you can access additional information about nodes.
 * <ol>
 * <li>
 * Query Object Structure<br><br>
 *
 * The query object is a JSON object which contains a select and a conditions block. The select block is an
 * array which defines the content and layout of the result. The conditions describe a set of tests on nodes
 * and their properties. The result will contain information for all elements on which all conditions passed
 * (implicit AND relation between condition array elements)
 * <br><br>
 * {<br>
 *  select:     [ <selectkey>,         <selectkey.value>      ]<br>
 *  conditions: [{<selectkey>:<value>, <conditionkey>:<value>}]<br>
 * }<br>
 * </li><br>
 * <li>
 * Select Keys<br><br>
 *
 * <table style="width:100%">
 * <tr>
 *     <th>Key</th>
 *     <th>Value</th>
 *     <th>Example</th>
 *     <th>Description</th>
 * </tr>
 * <tr>
 *     <td>nodeId</td>
 *     <td>number</td>
 *     <td>42</td>
 *     <td>The id of an aux or structure node.</td>
 * </tr>
 * <tr>
 *     <td>property</td>
 *     <td>any</td>
 *     <td>"label"</td>
 *     <td>The name of the property to check. If the property is a structure the sub-elements can be accessed with ".". If no condition is set, the node is selected if the property has a non-empty value.</td>
 * </tr>
 * <tr>
 *     <td>metadata</td>
 *     <td>any</td>
 *     <td>"auxAttributes.productionClass", "auxProperties.lowerTolerance"</td>
 *     <td>The name of the property to check. If the property is a structure the sub-elements can be accessed with ".". If no condition is set, the node is selected if the property has a non-empty value.</td>
 * </tr>
 * <tr>
 *     <td>nodeType</td>
 *     <td>string</td>
 *     <td>"structure", "aux"</td>
 *     <td>Check if the node belongs to a specific class.</td>
 * </tr>
 * <tr>
 * <td>topoHandle</td>
 * <td>json object</td>
 * <td>
 * {
 *   "entityID": 1583,
 *   "entityType": 1,
 *   "shapeInstanceID": 1
 * }
 * </td>
 * <td>An object that identifies one topological element. Topological elements can be faces edges or points.
 * The elementtype is identified by entityType which can be one of the following values:
 * </br> 1->face </br> 2->edge </br> 3->point </br> Note: This key is only used for the select part of the query as it is resolved to its specialization when returned. </br>  </td>
 * </tr>
 * <tr>
 * <td>faceHandle</td>
 * <td>json object</td>
 * <td>
 * {
 *   "entityID": 1583,
 *   "entityType": 1,
 *   "shapeInstanceID": 1
 * }
 * </td>
 * <td>An object that identifies a topological element of type face.  </br>  </td>
 * </tr>
 * <tr>
 * <td> edgeHandle </td>
 * <td>json object</td>
 * <td>
 * {
 *   "entityID": 1583,
 *   "entityType": 2,
 *   "shapeInstanceID": 1
 * }
 * </td>
 * <td>An object that identifies a topological element of type edge.  </br>  </td>
 * </tr>
 * <tr>
 * <td> pointHandle </td>
 * <td>json object</td>
 * <td>
 * {
 *   "entityID": 1583,
 *   "entityType": 3,
 *   "shapeInstanceID": 1
 * }
 * </td>
 * <td>An object that identifies a topological element of type point. </br>  </td>
 * </tr>

 * </table>
 * </li><br>
 * <li>
 * Conditions<br><br>
 *
 * <table style="width:100%">
 * <tr>
 *     <th>Key</th>
 *     <th>Value</th>
 *     <th>Example</th>
 *     <th>Description</th>
 * </tr>
 * <tr>
 *     <td>equals</td>
 *     <td>any</td>
 *     <td>"myLabel", "Label_*"</td>
 *     <td>Check whether the selected property equals the set value. Can contain * for arbitrary characters and whitespaces for basic wildcard matching.</td>
 * </tr>
 * <tr>
 *     <td>lessThan</td>
 *     <td>number</td>
 *     <td>5</td>
 *     <td>Test if the property value is larger than the specified value.</td>
 * </tr>
 * <tr>
 *     <td>lessOrEqualThan</td>
 *     <td>number</td>
 *     <td>4</td>
 *     <td>Test if the property value is larger or equal than the specified value.</td>
 * </tr>
 * <tr>
 *     <td>greaterThan</td>
 *     <td>number</td>
 *     <td>10</td>
 *     <td>Test if the property value is smaller than the specified value.</td>
 * </tr>
 * <tr>
 *     <td>greaterOrEqualThan</td>
 *     <td>number</td>
 *     <td>11</td>
 *     <td>Test if the property value is smaller than the specified value.</td>
 * </tr>
 * <tr>
 *     <td>caseSensitive</td>
 *     <td>boolean</td>
 *     <td>true</td>
 *     <td>Default is false.</td>
 * </tr>
 * <tr>
 *     <td>pointsTo</td>
 *     <td>number</td>
 *     <td>123 </td>
 *     <td>Is used to query aux to aux relations (see example).</td>
 * </tr>
 * </table>
 * </li><br>
 * <li>
 * Logical Keys<br><br>
 *
 * Logical keys can be put inside conditions instead of a select or condition key in order to express the corresponding logical operation.<br><br>
 *
 * <table style="width:100%">
 * <tr>
 *     <th>Key</th>
 *     <th>Value</th>
 *     <th>Example</th>
 *     <th>Description</th>
 * </tr>
 * <tr>
 *     <td>or</td>
 *     <td>array</td>
 *     <td>{"or": [{"nodeId": 15}, {"nodeId": 16}]}</td>
 *     <td>an OR relation</td>
 * </tr>
 * <tr>
 *     <td>and</td>
 *     <td>array</td>
 *     <td>{"and": [{"metadata": "auxProperties.sizeA", "equals": 15}, {"metadata": "auxProperties.sizeB", "equals": 20}]}</td>
 *     <td>an AND relation</td>
 * </tr>
 * <tr>
 *     <td>not</td>
 *     <td>condition</td>
 *     <td>{"not": {"metadata": "sizeA", "equals": 15}}</td>
 *     <td>invert a condition</td>
 * </tr>
 * </table>
 * </li><br>
 * <li>
 * Results<br><br>
 *
 * An array of arrays. For each successful condition match an array with the selected element values is returned. The order of values matches the select Specification.<br><br>
 *
 * <table style="width:100%">
 * <tr>
 *     <th>Select</th>
 *     <th>Result</th>
 * </tr>
 * <tr>
 *     <td>select: ["nodeId", "metadata.auxAttributes"]</td>
 *     <td>[[15, {...}], [42, {...}], ...]</td>
 * </tr>
 * </table>
 * </li><br>
 * <li>
 * Examples<br><br>
 *
 * <table style="width:100%">
 * <tr>
 * <th>Description</th>
 * <th>Query</th>
 * <th>Response</th>
 * </tr>
 * <tr>
 * <td>
 * Aux nodes for a faceHandle excluding nodes of type Revision index
 * </td>
 * <td>
 * {
 * "select": [
 *   "nodeId"
 * ],
 * "conditions": [
 *   {
 *     "nodeType": "aux"
 *   },
 *   {
 *     "faceHandle": {
 *       "entityType": 1,
 *       "shapeInstanceID": 2,
 *       "entityID": 814
 *     }
 *   },
 *   {
 *     "not": [
 *       {
 *         "metadata": "auxProperties.pmiType",
 *         "equals": "Revision Index"
 *       }
 *     ]
 *   }
 * ]
 * }
 * </td>
 * <td>
 * [
 *  [
 *    {
 *      "entityID": 1583,
 *      "entityType": 1,
 *      "shapeInstanceID": 1
 *    }
 *  ]
 *]
 * </td>
 * </tr>
 * <tr>
 * <td>
 * Select topological elements connected to one auxNode
 * </td>
 * <td>
 *{
 *  "select": [
 *    "topoHandle"
 *  ],
 *  "conditions": [
 *    {
 *      "nodeType": "aux"
 *    },
 *    {
 *      "nodeId": 2502
 *    }
 *  ]
 *}
 * </td>
 * <td>
 * [
 *  [
 *    {
 *      "entityID": 1583,
 *      "entityType": 2,
 *      "shapeInstanceID": 1
 *    }
 *  ],
 *  [
 *    {
 *      "entityID": 1584,
 *      "entityType": 1,
 *      "shapeInstanceID": 1
 *    }
 *  ]
 *]
 * </td>
 * </tr>
 * <tr>
 * <td>
 * Search metadata for minimum diameter
 * </td>
 * <td>
 * {
 *  "select":["nodeId", "metadata.auxProperties.label"],
 *  "conditions":[
 *   {"nodeType": "aux"},
 *   {"metadata":
 *     "auxProperties.pmiType",
 *     "equals": "Dimension"},
 *   {"metadata":
 *     "auxProperties.type",
 *     "equals": "Diameter"},
 *   {"metadata":
 *    "auxProperties.value",
 *    "greaterThan": 5.5}
 *  ]
 * }
 * </td>
 * <td>
 * [[15, "labelA"], [42, "labelB"], ...]
 * </td>
 * </tr>
 * <tr>
 * <td>
 * Textual search for modelView names
 * </td>
 * <td>
 *{
 *  "select": [
 *    "nodeId",
 *    "metadata.auxProperties.label"
 *  ],
 *  "conditions": [
 *    {
 *      "nodeType": "aux"
 *    },
 *    {
 *      "metadata": "auxProperties.pmiType",
 *      "equals": "ModelView"
 *    },
 *    {
 *      "metadata": "auxProperties.label",
 *      "equals": "2_51_*"
 *    }
 *  ]
 *}
 * </td>
 * <td>
 * [
 *  [
 *    8672,
 *    "2_51_Test_2_3"
 *  ]
 *]
 * </td>
 * </tr>
 * <tr>
 * <td>
 * Search for PMI Type
 * </td>
 * <td>
 *    {
 * "select": [
 *   "nodeId",
 *   "metadata.auxProperties.*"
 * ],
 * "conditions": [
 *   {
 *     "nodeType": "aux"
 *   },
 *   {
 *     "metadata": "auxProperties.pmiType",
 *     "equals": "Dimension"
 *   },
 *   {
 *     "metadata": "auxProperties.fit",
 *     "equals": "h8",
 *     "caseSensitive": true
 *   }
 * ]
 *}
 * </td>
 * <td>
 * [
 * [
 *   5411,
 *   {
 *     "metadata.auxProperties.bottomRight": "0.0640887 0 -0.0686957",
 *     "metadata.auxProperties.type": "Linear",
 *    ...
 *   }
 * ]
 *]
 * </td>
 * </tr>
 * <tr>
 * <td>
 * Search for attributes
 * </td>
 * <td>
 * {
 *  "select":["nodeId"],
 *  "conditions":[
 *   {"nodeType": "aux"},
 *   {"metadata":
 *    "auxAttributes.precision",
 *    "greaterThan": 2},
 *   {"metadata":
 *    "auxAttributes.originAnchor",
 *    "equals": 4},
 *  ]
 * }
 * </td>
 * <td>
 * [[15], [42], ...]
 * </td>
 * </tr>
 * <tr>
 * <td>
 * Nested query example
 * </td>
 * <td>
 *{
 *  "select": [
 *    "nodeId",
 *    "metadata.auxAttributes.label"
 *  ],
 *  "conditions": [
 *    {
 *      "nodeType": "aux"
 *    },
 *    {
 *      "metadata": "auxProperties.pmiType",
 *      "equals": "DatumFeatureSymbol"
 *    },
 *    {
 *      "metadata": "auxAttributes.label",
 *      "equals": {
 *        "select": [
 *          "metadata.auxProperties.propertyName"
 *        ],
 *        "conditions": [
 *          {
 *            "nodeType": "aux"
 *          },
 *          {
 *            "metadata": "auxProperties.pmiType",
 *            "equals": "frame"
 *          },
 *          {
 *            "nodeId": 7522
 *          }
 *        ]
 *      }
 *    }
 *  ]
 *}
 * </td>
 * <td>
 * [
 *  [
 *    1234,
 *    "abc"
 *  ],
 * .....
 *]
 * </td>
 * </tr>
 * <tr>
 * <td>
 * Query auxNodes of type ModelView connected to specific auxNode
 * </td>
 * <td>
 *{
 *"select": [
 *    "nodeId"
 *  ],
 *  "conditions": [
 *    {
 *      "nodeType": "aux"
 *    },
 *    {
 *      "metadata": "auxProperties.pmiType",
 *      "equals": "ModelView"
 *    },
 *    {
 *      "pointsTo": 323
 *    }
 *  ]
 * </td>
 * <td>
 * [
 *  [
 *    1234
 *  ],
 *  [
 *    3456
 *  ],
 * .....
 *]
 * </td>
 * </tr>
 * </table>
 * </li>
 * </ol>
 */
export interface QueryAPI {
    /**
     * Executes the query on the specified subtree
     * @param {IWebVisQuery | IWebVisQueryObject | string} query
     * @param {number} nodeID
     * @returns {IWebVisQuery}
     */
    query(query: Query | string, nodeID?: number): Promise<QueryResult>;
    /**
     *
     * @param {string | Array<string>}queryArgument
     * @param {string} key
     * @param {number} scope
     * @returns {number} - the id of the collection
     */
    createCollectionFromQueryString(queryArgument: string | Array<string>, key?: string, scope?: number): Promise<number>;
}


export interface RealityAPI {
    /**
    * @experimental
    *
    * @returns {Promise<boolean>} returns a Promise
    */
    connectXRSession: () => Promise<XRSessionState>;
    /**
    * @experimental
    *
    * Get current state if XR functionality
    * @returns {XRSessionState} returns a Promise
    */
    getXRSessionState: () => XRSessionState;
    /**
    * @experimental
    *
    * list all the available XR members in the current session
    * @returns {Promise<Array<XRMember>>} returns a Promise with the list of all available XRMembers
    */
    getXRMembers: () => Array<number>;
    /**
    * @experimental
    *
    * list all the available XR members in the current session
    * @param {number} XRMemberId the XRMember that the operation should be applied on
    * @returns {XRMemberInfo} returns a struct containing all relevant infos
    * (memberId, XRCapabilities, sessionMemberData) for the given member
    */
    getXRMemberInfo: (memberId: number) => XRMemberInfo;
    /**
    * @experimental
    *
    * Get the runtime state of a XR Member
    * @param {number} XRMemberId the XRMember that the state should be queried from
    * @returns {XRMemberState | undefined} returns either the member state if the member exist
    * or return undefined if xr is not connected or memberId does not exist
    */
    getXRMemberState: (memberId: number) => XRMemberState | undefined;
    /**
    * @experimental
    *
    * execute whatever is necessary to enable XRCapbilities on the given member, e.g. start
    * the camera or forward to the booster
    * @param {number} XRMemberId the XRMember that the operation should be applied on
    * @returns {Promise<boolean>} returns a Promise which reports wether the operation
    * was successful or not
    */
    requestXMemberCapabilities: (memberId: number) => Promise<boolean>;
    /**
    * @experimental
    *
    * enters the initialization phase for modeltracking, this is also used to reset
    * the current modeltracking. It will also trigger
    * REALITY_MODELTRACKERSTATE_CHANGED event with the ModelTrackingState.INIT set to true
    * @param {number} XRMemberId the XRMember that the operation should be applied on
    * @returns {Promise<boolean>} returns a Promise which reports wether the operation
    * was successful or not
    */
    enterXRMemberInitMode: (memberId: number) => Promise<boolean>;
    /**
    * @experimental
    *
    * leaves the initialization phase for modeltracking, this will also fixate the model
    * at the current position
    * @param {number} XRMemberId the XRMember that the operation should be applied on
    * @returns {Promise<boolean>} returns a Promise which reports wether the operation
    * was successful or not
    */
    exitXRMemberInitMode: (memberId: number) => Promise<boolean>;
    /**
    * @experimental
    *
    * Puts the image stream in the background of the renderer. It will also trigger
    * REALITY_XRSTATE_CHANGED event with the XRState.FOLLOWING set to true
    * @param {number} XRMemberId the XRMember that the operation should be applied on
    * @returns {Promise<boolean>} returns a Promise which reports wether the operation
    * was successful or not
    */
    startXRMemberSpectate: (memberId: number) => Promise<boolean>;
    /**
    * @experimental
    *
    * Stops the image stream in the background of the renderer. It will also trigger
    * REALITY_XRSTATE_CHANGED event with the XRState.FOLLOWING set to false
    * @param {number} XRMemberId the XRMember that the operation should be applied on
    * @returns {Promise<boolean>} returns a Promise which reports wether the operation
    * was successful or not
    */
    stopXRMemberSpectate: (memberId: number) => Promise<boolean>;
    /**
    * @experimental
    *
    * Fixates the model at the current position. It will also trigger
    * REALITY_XRSTATE_CHANGED event with the XRState.FIXATED set to true
    * @param {number} XRMemberId the XRMember that the operation should be applied on
    * @returns {Promise<boolean>} returns a Promise which reports wether the operation
    * was successful or not
    */
    fixateXRMember: (memberId: number) => Promise<boolean>;
    /**
    * @experimental
    *
    * Unfixates the model. The model will move with the device. It will also trigger
    * REALITY_XRSTATE_CHANGED event with the XRState.FIXATED set to false
    * @param {number} XRMemberId the XRMember that the operation should be applied on
    * @returns {Promise<boolean>} returns a Promise which reports wether the operation
    * was successful or not
    */
    unfixateXRMember: (memberId: number) => Promise<boolean>;
    /**
    * @experimental
    *
    * This will set settings for the specific xr member.
    *
    * modeltrackerQualityThreshold sets a normalized threshold for the modeltracker. The threshold determines the actual
    * correspondence of the generated line model to the real world. A value of 1 means total correspondence,
    * while a value of zero means no correspondence at all. Depending on that value the tracker will trigger
    * a REALITY_MODELTRACKERSTATE_CHANGED event with the ModelTrackingState.SNAPPED to true and a REALITY_XRSTATE_CHANGED event
    * with XRState.FIXATED set to true
    *
    * enableDebugImages will enable or disable the edge images to be send from the modeltracker. If set to true it will trigger
    * REALITY_MODELTRACKER_EDGEIMG_RECEIVED events once an debug image arrives. Note: When enabled this will impact
    * bandwidth and perfomance of the application, so we recommand using this only on demand.
    *
    * @param {number} XRMemberId the XRMember that the operation should be applied on
    * @param {XRMemberSettings} settings The quality threshold for the modeltracker must be between 0 and 1
    * @returns {Promise<boolean>} returns a Promise which reports wether the operation
    * was successful or not
    */
    setXRMemberSettings: (memberId: number, settings: XRMemberSettings) => Promise<boolean>;
    /**
    * @deprecated
    *
    * start AR. Projects the camera stream in the background and starts searching for the given reference.
    * The reference is defined by setting the realproperty on the particular node via the webvis API.
    * E.g. webvis.setProperty(0, pluginAPI.realProperty, pluginAPI.realState.Enabled)
    * @returns {Promise<boolean>} returns true if starting was successfull or false if it could not start AR
    */
    startAR: () => Promise<boolean>;
    /**
    * @deprecated
    *
    * stop AR. Stop projecting the camera stream in the background and reset background to default color.
    * @returns {Promise<boolean>} returns true if stopping was successfull or false if it could not stop AR
    */
    stopAR: () => Promise<boolean>;
    /**
    * @deprecated
    *
    * restart modeltracker initialization for the local xr member
    * @returns {Promise<boolean>} returns true if resetting was successfull or false if not
    */
    resetAR: () => Promise<boolean>;
    /**
    * @deprecated
    *
    * show expert dialog for developers or advanced users
    * @returns {Promise<boolean>} returns true if the operation was successfull or false if not
    */
    showExpertDialog: () => Promise<boolean>;
}

export interface L3DResourceData {
}
export enum NodeInfoState {
    DEFAULT = 0,
    MISSING_DATA = 4,
    MISSING_DATA_IN_SUBTREE = 8,
    WARNINGS = 10,
    ERRORS = 5
}
export enum L3DExpandState {
    COLLAPSED = 0,
    EXPANDED = 1
}
export enum L3DResourceClientState {
    INIT = 0,
    REQUESTED = 1,
    LOADING = 2,
    UNKNOWN_ERROR = 3,
    CACHE_DATA_ERROR = 4,
    CACHE_REF_ERROR = 5,
    CACHE_AUTH_ERROR = 6,
    NETWORK_ERROR = 7,
    LICENSE_ERROR = 8,
    WAITING = 9,
    READY = 10,
    EMPTY = 11,
    UNLOADED = 13,
    CACHE_DEPENDENCY_ERROR = 14,
    NUM_CLIENT_RESOURCE_STATES = 15
}
export interface ITranscoderOption {
    name: string;
    label: string;
    type: string;
    value: any;
    disabled: boolean;
    dependent: string;
}
export interface IContentType {
    id: string;
    mimeTypes: Array<string>;
    suffixes: Array<string>;
    skipTranscoding: boolean;
    classes?: Array<string>;
    isExperimental?: boolean;
    isLicensed?: boolean;
    label?: string;
    homeUrl?: string;
}
export interface ITranscoderCommand {
    inputContentType: IContentType;
    options: Array<ITranscoderOption>;
}
export interface ITranscoderCommandRequest {
    command: ITranscoderCommand;
    originalURI: string;
    contentType: IContentType;
    callback: (command: ITranscoderCommand) => void;
}
export class CommandRequest implements ITranscoderCommandRequest {
    command: ITranscoderCommand;
    originalURI: string;
    contentType: IContentType;
    callback: (command: ITranscoderCommand) => void;
    constructor(originalURI: string, command: ITranscoderCommand, callback: (command: ITranscoderCommand) => void);
}
export interface ResourceAPI {
    resolve(nodeID: number): Promise<L3DExpandState>;
    requestContentTypes(): Promise<Array<IContentType>>;
    requestResource(resourceClass: string, parameters: any, spaceDomain?: string): Promise<any>;
    requestL3DResourceData(nodeID: number): Promise<L3DResourceData | void>;
    getL3DResourceID(nodeID: number): number;
    /**
     * Returns the link nodes of the node's resource and subtree
     * @param nodeID
     * @param recursive
     */
    requestResourceLinks(nodeID: number, recursive?: boolean): Promise<Array<number>>;
    collectL3DResourcesWithAuxStructure(nodeID: number): Promise<Array<number>>;
}


/**
 * In webVis, a Collection is used to represent the visible selection in the user interface.
 * It is possible to select nodes by using a Collection and/or add/remove individual nodes the the selection
 * by using functions in the webvis API.
 */
export interface SelectionAPI {
    /**
     * Returns the node IDs for all nodes in the current selection. Any operations on this Array will result
     * in undefined behavior.
     *
     * @deprecated
     * @READONLY
     * @param {number} scope - A scope for the return selection
     *
     * @return An Array which contains the IDs of all nodes in the current selection
     */
    getSelection(): Promise<Array<number>>;
    /**
     * Returns the node IDs for all leaf nodes in the current selection.
     *
     * @READONLY
     *
     * @return An Array which contains the IDs of all leaf nodes in the current selection
     */
    getSelectedLeafNodes(): Array<number>;
    /**
     * Returns the node IDs for all nodes in the current selection. Any operations on this Array will result
     * in undefined behavior.
     *
     * @READONLY
     *
     * @return An Array which contains the IDs of all nodes in the current selection
     */
    getSelectedNodes(): Array<number>;
    /**
     * Replaces the current selection with the nodes from the given collection.
     *
     * @param collectionID Sets the current selection to the given collection of nodes
     */
    selectCollection(collectionID: number, silent?: boolean): Promise<ChangeSelectionResult | void>;
    /**
     * Clears the selection.
     */
    clearSelection(silent?: boolean): Promise<ChangeSelectionResult>;
    /**
     * Creates a new selection containing all the nodes that are currently not selected.
     */
    invertSelection(silent?: boolean): Promise<ChangeSelectionResult>;
    /**
     * Adds the given node to the selection. If recursive is true,
     * the descendents of the node are also added to the selection. If the node is already selected,
     * this function has no effect.
     *
     * @param nodeID    The ID of the node that should be added to the current selection
     */
    addToSelection(nodeID: number | Array<number>, silent?: boolean): Promise<ChangeSelectionResult>;
    /**
     * Removes the given node from the selection. If recursive is true,
     * the descendents of the node are also removed from the selection. If the given node is not in the selection,
     * this function has no effect.
     *
     * @param nodeID    The ID of the node that should be removed from the current selection
     * @param recursive A flag that specifies whether the children of the given node should also be removed from the current selection
     */
    removeFromSelection(nodeID: number | Array<number>, silent?: boolean): Promise<ChangeSelectionResult>;
    /**
     * Returns true, if the node is currently selected.
     *
     * @param  nodeID The ID of the node for which we would like to know if it is selected or not
     *
     * @return        True of the given node is selected, otherwise false
     */
    isSelected(nodeID: number): Promise<boolean>;
    /**
     * Replaces the current selection with the specified nodes
     *
     * @param The nodeIDs which you want to select
     */
    setSelection(nodeID: number | Array<number>, silent?: boolean): Promise<ChangeSelectionResult>;
    getLastSelectedNodeID(): number;
    setLastSelectedNodeID(nodeID: number): void;
}



export interface ServiceProviderAPI {
    isServiceAvailable(name: string): boolean;
    requestService<T>(serviceClass: string, parameters: any, spaceDomain?: string, serviceUUID?: string): Promise<ResourceUpdate<T>>;
    getResourceEndpointURL(update: ResourceUpdate<any>, endpointName: ResourceEndpointName): string;
    sendToService(serviceEndpoint: string, method: string, responseType?: string, postContent?: string, postContentType?: string): Promise<any>;
}


export interface SharedSessionData {
    wsEndpoint: string;
    initPose: Float32Array;
    sessionID: string;
    resetURL: string;
    debugURL: string;
    paramsURL: string;
}
export enum SessionConnectionState {
    INIT = 0,
    CONNECTING = 1,
    CONNECTED = 2
}
export enum SessionConnectionHints {
    NORMAL = 0,
    HIDDEN = 1,
    FORCE = 2
}
export interface IWebRTCStream {
    connect(stream: ISessionStreamData): void;
    onMediaStream(callback: (stream: MediaStream) => void): void;
}
/**
 * The session API allows to share the state of the instanceGraph between multiple user.
 */
export interface SessionAPI {
    connectToSession(sessionID?: string, name?: string, scenarioURI?: string, hints?: SessionConnectionHints): Promise<ISessionStateData>;
    disconnectFromSession(): void;
    shutdownSession(): Promise<void>;
    removeSessionMember(memberID: number): void;
    promoteSessionMember(memberID: number): void;
    getSessionStreams(conditions?: SessionStreamCondition): Promise<Array<ISessionStreamData>>;
    awaitStream(conditions: SessionStreamCondition): Promise<ISessionStreamData>;
    subscribeStream(streamID: number, callback?: SessionStreamMessageCallback): Promise<void>;
    unsubscribeStream(streamID: number, callback: SessionStreamMessageCallback): void;
    publishStream(data: ISessionStreamData): Promise<number>;
    /**
     * @hidden
     * @param streamID
     */
    removeStream(streamID: number): void;
    onStreamStateChange(streamID: number, callback: SessionStreamStateChangeCallback): void;
    sendToStream(streamID: number, message: string | ArrayBuffer): void;
    getSessionMemberID(): number;
    getSessionMembers(): Promise<Array<ISessionMemberData>>;
    getSessionStateData(): ISessionStateData;
    readSessionParameter(sessionParameter: string, flags: {
        [key: string]: any;
    }): Promise<any>;
    changeSessionParameter(sessionParameter: string, value?: any, flags?: {
        [key: string]: any;
    }): void;
    loadScenario(scenarioURI: string): Promise<void>;
    attachMediaTrack(streamID: number, track: MediaStreamTrack, stream: MediaStream): void;
    onMediaTrack(streamID: number, callback: (track: MediaStreamTrack, streams: Array<MediaStream>) => void): void;
    requestDerivedSessionToken(): Promise<string>;
}
export enum MemberPrivileges {
    Moderator = "moderator"
}

export type SessionSyncData = {
    annotationIDs: number[];
    attachmentsIDs: number[];
    measurementIDs: number[];
    snapshotIDs: number[];
    runtimeIDs: number[];
};

export type SessionSyncDataMap = {
    runtimeIDs: {
        [key: number]: number;
    };
};


export interface SnapshotContentSelection {
    restoreTree?: boolean;
    restoreCamera?: boolean;
    restoreAnnotations?: boolean;
    restoreMeasurements?: boolean;
    restoreSelection?: boolean;
    restoreLayerFilter?: boolean;
}
export interface ISessionStore {
    instances: {
        [key: number]: any;
    };
    snapshots: {
        [key: number]: any;
    };
    attachments: Array<any>;
    customProperties: Array<any>;
    propertyKeys: Array<string>;
    activeSnapshotID: number;
    tags: {
        [key: string]: string;
    };
    animationFrames: {
        [key: string]: Array<AnimationFrame>;
    };
    about: {
        [key: string]: string;
    };
}
export interface StoredSessionIdentifier {
    date: string;
    id: string;
    tags?: {
        [key: string]: string;
    };
}
export interface StoredSessionList {
    error: any;
    sessions: Array<StoredSessionIdentifier>;
}
export enum ProgressStatus {
    progress = "progress",
    error = "error",
    done = "done"
}
export type ProgressUpdate = {
    id: string;
    current?: number;
    max?: number;
    status: ProgressStatus;
};
export type SnapshotData = {
    name: string;
    attachmentID: number;
};
export type ProgressCallback = (update: ProgressUpdate) => void;
/**
 * With these functions the user can control webVis' management of SessionStorage objects:
 */
export interface SessionStorageAPI {
    /**
     * Check whether a storage endpoint was found on the hub or the booster.
     * @returns {boolean}
     */
    isSessionStorageAvailable(): boolean;
    /**
     * Creates a snapshot of the current view and returns its ID.
     * @returns {Promise<number>}
     */
    createSnapshot(name?: string): Promise<number>;
    /**
     * Restores the snapshot for the given snapshotID.
     * The settings parameter allows to control the subset of the snaphots data to be restored
     * @param {number} snapshotID
     * @param {SnapshotContentSelection} settings
     */
    restoreSnapshot(snapshotID: number, settings?: SnapshotContentSelection): Promise<void>;
    /**
     * This changes the textual description of the snapshot for given snapshotID to the value of text.
     * @param {number} snapshotID
     * @param {string} name
     * @param {string} screenshotURL
     */
    changeSnapshot(snapshotID: number, name?: string, screenshotURL?: string): void;
    /**
     * Deletes the snapshot for given snapshotID.
     * @param snapshotID
     */
    removeSnapshot(snapshotID: number): void;
    /**
     * Clears all snapshots.
     */
    clearSnapshots(): void;
    /**
     * Exports the session to the requested format.
     * Supported formats are: plmxml
     * <table>
     * <tr>
     *  <th>
     *  </th>
     *  <th>
     *    X3D
     *  </th>
     *  <th>
     *    STEP242XML
     *  </th>
     *  <th>
     *    PLMXML
     *  </th>
     * </tr>
     *
     * <tr>
     *  <td>
     *    Available
     *  </td>
     *  <td style="color:red">
     *    ✗
     *  </td>
     *  <td style="color:red">
     *    ✗
     *  </td>
     *  <td style="color:green;">
     *    ✓
     *  </td>
     * </tr>
     *
     * <tr>
     *  <td>
     *    Structure
     *  </td>
     *  <td>
     *    -
     *  </td>
     *  <td>
     *    -
     *  </td>
     *  <td style="color:green;">
     *    ✓
     *  </td>
     * </tr>
     *
     * <tr>
     *  <td>
     *    Enabled State
     *  </td>
     *  <td>
     *    -
     *  </td>
     *  <td>
     *    -
     *  </td>
     *  <td style="color:red">
     *    ✗
     *  </td>
     * </tr>
     *
     * <tr>
     *  <td>
     *    Transforms
     *  </td>
     *  <td>
     *    -
     *  </td>
     *  <td>
     *    -
     *  </td>
     *  <td style="color:green;">
     *    ✓
     *  </td>
     * </tr>
     *
     * <tr>
     *  <td>
     *    Clipplanes
     *  </td>
     *  <td>
     *    -
     *  </td>
     *  <td>
     *    -
     *  </td>
     *  <td style="color:red">
     *    ✗
     *  </td>
     * </tr>
     *
     * <tr>
     *  <td>
     *    Measurements
     *  </td>
     *  <td>
     *    -
     *  </td>
     *  <td>
     *    -
     *  </td>
     *  <td style="color:red">
     *    ✗
     *  </td>
     * </tr>
     *
     * <tr>
     *  <td>
     *    Snapshots
     *  </td>
     *  <td>
     *    -
     *  </td>
     *  <td>
     *    -
     *  </td>
     *  <td style="color:red">
     *    ✗
     *  </td>
     * </tr>
     *
     * <tr>
     *  <td>
     *    Annotations
     *  </td>
     *  <td>
     *    -
     *  </td>
     *  <td>
     *    -
     *  </td>
     *  <td style="color:red">
     *    ✗
     *  </td>
     * </tr>
     *
     * <tr>
     *  <td>
     *    Attachments
     *  </td>
     *  <td>
     *    -
     *  </td>
     *  <td>
     *    -
     *  </td>
     *  <td style="color:red">
     *    ✗
     *  </td>
     * </tr>
     *
     * <table>
     * @param {string} format
     */
    exportSession(format?: string): Promise<any>;
    /**
     * Imports a session from the data string of the given format.
     * Supported formats are: JSON
     * @param {any} data the content of the file
     * @param {string} format
     */
    importSession(data: any, format?: string): Promise<any>;
    /**
     * Temporarily stores the session in the infrastructure and returns a handle.
     *
     * @param {object} tags a map of tags to store with the session snapshot
     * @param {boolean} offline sets the space domain to the local one
     * @param {ProgressCallback} called when the progress of the store operation changes
     * @returns {Promise<string>}
     */
    storeSession(tags?: {
        [key: string]: string;
    }, offline?: boolean, progressCallback?: ProgressCallback): Promise<string | void>;
    /**
     * Imports the session for the given data handle from the infrastructure.
     * @param {string} handle
     * @returns {Promise<void>}
     */
    restoreSession(handle: string): Promise<void>;
    /**
     * Retrieves the list of sessions from the infrastructure matching the filter.
     * @param {object} filter
     * @returns {Promise<StoredSessionList>}
     */
    requestStoredSessionHandles(filter: any): Promise<StoredSessionList>;
    /**
     * returns how many snapshots are currently loaded
     */
    getSnapshotCount(): number;
    /**
     * Returns the ids of all available snapshots
     * @returns {Array<number>} The ids of all available snapshots
     */
    getSnapshots(): Array<number>;
    /**
     * Returns the ids of all available snapshots
     * @returns {Array<number>} The ids of all available snapshots
     */
    getSnapshotData(snapshotID: number): SnapshotData;
}

export enum Feature {
    API = 1,
    UI = 2,
    TOUCH = 4,
    AUX = 8,
    AUX_ADVANCED = 16,
    QUERY = 32,
    MEASUREMENT = 64,
    MEASUREMENT_ADVANCED = 128,
    WEBVR = 256,
    SHARED_SESSION = 512,
    LOCAL_VISIBILITY = 1024,
    REMOTE_VISIBILITY = 2048,
    REMOTE_RENDERING = 4096,
    PAINT_MODE = 8192,
    COLOR_COMPARISON = 16384,
    STORE_RESTORE = 32768,
    POINT_RENDERING = 65536,
    PBR_MATERIAL = 131072,
    SESSION_STORAGE = 262144,
    SPACE = 524288,
    CAD_DMU = 1048576,
    COLLABORATION = 2097152,
    XR = 4194304,
    MODEL_TRACKING = 8388608
}
export interface SessionTrackingAPI {
    getSessionDurationString(): string;
    getSessionPingCount(): number;
    sendFeedback(message: string, rating: number): void;
    isFeatureEnabled(feature: Feature): boolean;
}

/**
 * The user or surrounding application may change its webVis‘ configuration to adjust its behaviour.
 * A configuration in webVis is a collection of settings, where each setting consists of a key-value pair
 * and an optional attributes object, which describes type and possible values for a better UI representation.
 *
 * There are several ways to change the configuration:              <br>
 *
 * <ul>
 *      <li>
 *          &lt;webvis-config> : Place a webvis config tag in the html with key-pairs in a JSON string,
 *          e.g. &lt;webvis-config>{key1:value1, key2:value2}&lt;/webvis-config>"
 *      </li>
 *      <li>
 *          Config file: Place the key-value pairs in the global configuration file in your instant3Dhub.
 *      </li>
 *      <li>
 *          The following API functions
 *      </li>
 *      <li>
 *          URL parameters: Append "?key1=value1&key2=value2" to the end of the url. AS URL parameters,
 *          a few extra setting parameters exist (can not be set via the other methods):
 *
 *          <ul>
 *              <li>
 *                  <b>initData:</b> Defines the URL of a model that should be initially loaded.
 *              </li>
 *              <li>
 *                  <b>autoplay:</b> (no value, only as key) Enables the initial model directly after loading.
 *              </li>
 *              <li>
 *                  <b>query:</b> Initial search string for filtering parts that should be enabled
 *                  (currently only with webvis-full).
 *              </li>
 *          </ul>
 * </ul>
 */
export enum WebVisConfigPriority {
    WEBVIS_DEFAULT = 0,
    RENDER_SETUP = 1,
    EXTERNAL_CONFIG = 2,
    INLINE_CONFIG = 3,
    LOCAL_STORAGE = 4,
    SETTINGS_API = 5
}
export interface SettingsAPI {
    /**
     * Changes the setting to the given value. Attributes can be used to set boundaries or a set of
     * possible values. The priority parameter can be used to specify a priority – by default, the highest
     * priority (SETTINGS_API) is used. Lower priorities are typically used for values read from the HTML
     * markup and from external config files.
     *
     * @param setting    A name that specifies a particular setting
     * @param value      The new value for the setting
     * @param attributes Additional constraints on the values of the setting
     * @param persistent Makes change persistent over multiple sessions (saves it to localStorage)
     */
    changeSetting(setting: string, value: any, attributes?: Object, persistent?: boolean): void;
    /**
     * Returns the value of a setting.
     *
     * @param  setting The name of the setting that should be read
     *
     * @return The value of the specified setting
     */
    readSetting(setting: string): any;
    /**
     * Returns a list of all setting keys.
     *
     * @return An array which contains the names of all settings
     */
    getSettingKeys(): Array<string>;
    /**
     * Returns the attribute object for the specified setting.
     *
     * @param  setting The name of the setting whose attribute(s) should be read
     *
     * @return         The value of the attribute(s)
     */
    readSettingAttributes(setting: string): Object;
    resetUserSettings(): void;
}

/**
 * @hidden
 */
export enum EntityType {
    VOID = 0,
    FACE = 1,
    EDGE = 2,
    POINT = 3
}
export enum TopologySemantic {
    length = 0,
    axis = 1,
    point = 2,
    direction = 3,
    area = 4,
    volume = 5,
    degree = 6,
    text = 7,
    plane = 8,
    line = 9
}
export interface ITopologyDataProperty {
    name: string;
    semantic: string;
    value: any;
}
export interface ITopologyDataEntry {
    type: string;
    properties: Array<ITopologyDataProperty>;
    targets: Array<ITopologyDataProperty>;
    topoType: string;
}
/**
 * @hidden
 */
export interface ITopologyDataSelector {
    shapeInstanceID?: number;
    entityType?: EntityType;
    entityID?: number;
}
/**
 * Runtime offset and range in the global shape instance space for the shapes of a resource-
 */
export interface IResourceShapeInstanceRange {
    shapeInstanceOffset: number;
    numShapeInstances: number;
}
/**
 * Shape information, containing the numbers for the topological entities.
 */
export interface IShapeData {
    numEdges: number;
    numPoints: number;
    numFaces: number;
}
/**
 * External identification (extracted from the original input) for a shape or a face of a shape.
 */
export interface IExternalTopologyIdentifier {
    shapeID: any;
    faceID?: any;
}
export interface ShapeTopologyAPI {
    requestResourceShapeInstanceRange(nodeID: number): Promise<IResourceShapeInstanceRange>;
    /**
     * Returns the shape data for the shape instance id.
     * @param shapeInstanceID
     * @returns IShapeData
     */
    requestShapeData(shapeInstanceID: number): Promise<IShapeData>;
    /**
     * @deprecated Functionality has to be reworked for future release and is not usable.
     * Returns the external topology identifier for the runtime selector.
     * @param selector
     * @returns IExternalTopologyIdentifier
     */
    requestExternalTopologyID(selector: ITopologyDataSelector): Promise<IExternalTopologyIdentifier>;
    /**
     * @deprecated Functionality has to be reworked for future release and is not usable.
     * Returns the runtime selectors for a resource (identified by a node id) and an external identifier of a
     * topological element.
     * @param nodeID - a node to identify the scope resource
     * @param external - the external identifier
     * @returns Promise<Array<ITopologyDataSelector>>
     */
    requestSelectorsForExternalTopologyID(nodeID: number, external: IExternalTopologyIdentifier): Promise<Array<ITopologyDataSelector>>;
}



export interface UtilityAPI {
    getDataInfoValue(key: string, value: string): string;
    translate(value: string): string;
    addTranslation(lang: string, key: string, value: string): void;
    toUnit(value: number, unit: string, decimals?: number): string;
    toSemanticUnit(semanticString: string, value: Array<number>, color: Array<string>, unit: string): string;
    getUnitConversionValues(): {
        [unit: string]: number;
    };
    appendURL(baseUrl: string, appendix: string, replaceQuestionMark?: boolean): string;
    copyToClipboard(text: string, html: string): void;
    boxVolumeToString(volume: BoxVolume): string;
    getWebvisLocation(): string;
    getFileSuffix(uri: string): string;
    /**
     * Register a callback to a specific state. The callback is executed once when the state is reached.
     * If webVis is already in that state the callback is triggered immediately.
     *
     * @param  state The state for which a callback is registered
     *
     * @return       A promise which throws an error if the requested state is invalid
     *
     * The following states are allowed as target </br>
     * <code>init</code> - Is reached when webVis is fully configured and set up.<br>
     * <code>resourceStateUpdated</code> - Is reached when there is state information available for all resources (This information can also be "still transcoding").<br>
     * <code>resourceProcessed</code> - This is triggered when all resources are done transcoding.<br>
     * <code>renderingFinished</code> - This is triggered when webVis is done with rendering. So no more image changes are imminent.<br>
     */
    waitFor(state: string): Promise<any>;
    /**
     * Takes a screenshot of the current view and invokes the callback with its dataURL.
     *
     * @param callback The callback function which is called when the screenshot is taken
     */
    takeScreenshot(callback: (url: string) => void): void;
    initDownload(dataURL: string, name: string): void;
    /**
     * Returns a json object containing the metadata for the given nodeID
     *
     * @param  nodeID The ID of a node
     *
     * @return A json object containing the requested metadata
     */
    getMetadata(nodeID: number): Promise<MetaDataJSON>;
    /**
     * Returns an array of the requested user data in a given response type
     *
     * @param  nodeID The ID of a node
     * @param  userRef The path to the userdata
     * @param  responseType The type of the response. ("text", "json", "blob", "arraybuffer")
     *
     * @return An Object containing the requested userdata in the subtree of the given nodeID
     */
    requestUserData(nodeID: number, userRef: string, responseType: string): Promise<any>;
    /**
     * Returns the id of the given node's resource root
     *
     * @param  nodeID The ID of the node
     *
     * @return The ID of the nodes resource root
     *
     * @experimental
     */
    getResourceRootID(nodeID: number): Promise<number>;
    /**
     * Creates a new BoxVolume object.
     *
     * @returns A new Box Volume
     */
    createBoxVolume(min?: Float32Array, max?: Float32Array): BoxVolume;
    getFullSceneVolume(): Promise<BoxVolume>;
    getCurrentSceneVolume(): Promise<BoxVolume>;
    getDeviceTags(): Array<string>;
}

export enum AnimationDirection {
    FORWARD = "forward",
    REVERSE = "reverse"
}

export enum AnimationPlayState {
    INITIAL = "initial",
    RUNNING = "running",
    PAUSED = "paused"
}

export enum AnimationProperty {
    CENTER = "center",
    COLOR = "color",
    ROTATION = "rotation",
    SCALE = "scale",
    TRANSLATION = "translation",
    OPACITY = "opacity",
    ENABLED = "enabled"
}

export enum AnimationTimingFunction {
    LINEAR = "linear",
    EASEIN = "easein",
    EASEOUT = "easeout",
    EASEINOUT = "easeinout"
}

export enum AnimationTransformOrigin {
    CENTER = "center",
    CUSTOM = "custom"
}

export enum CoordinateSpace {
    CLIP = 0,
    GLOBAL = 1,
    LOCAL = 2,
    OBJECT = 3,
    SCREEN = 4,
    VIEW = 5
}

export enum EnabledState {
    Disabled = 0,
    Enabled = 1,
    Partial = 2
}

export enum EventType {
    NODE_CHANGED = 0,
    NODE_ADDED = 1,
    NODE_REMOVED = 2,
    NODE_CLICKED = 3,
    NODE_POINTER_ENTER = 4,
    NODE_POINTER_OVER = 5,
    NODE_POINTER_OUT = 6,
    SNAPSHOT_CREATED = 7,
    SNAPSHOT_RESTORED = 8,
    SNAPSHOT_REMOVED = 9,
    SNAPSHOT_CHANGED = 10,
    MEASUREMENT_CREATED = 11,
    MEASUREMENT_CHANGED = 12,
    MEASUREMENT_UI_CHANGED = 13,
    MEASUREMENT_REMOVED = 14,
    CLIPPLANE_CREATED = 15,
    CLIPPLANE_CHANGED = 16,
    CLIPPLANE_REMOVED = 17,
    CLIPPING_ROOM_CREATED = 18,
    CLIPPING_ROOM_CHANGED = 19,
    ANNOTATION_CREATED = 20,
    ANNOTATION_CHANGED = 21,
    ANNOTATION_REMOVED = 22,
    SETTING_CHANGED = 23,
    VIEWER_SETTING_CHANGED = 24,
    WEBVIS_READY = 25,
    NOTIFICATION = 26,
    ACTIVE_SCENE_VOLUME_CHANGED = 27,
    SELECTION_CHANGED = 28,
    MODEL_RENDERED = 29,
    CUSTOM_TREE_ICON_CLICKED = 30,
    INTERACTION_MODE_CHANGED = 31,
    LAYERFILTER_CHANGED = 32,
    LAYERFILTER_REGISTERED = 33,
    ACTIVE_ITEM = 34,
    EXPLOSION_STARTED = 35,
    EXPLOSION_CHANGED = 36,
    EXPLOSION_FINISHED = 37,
    UPDATESTATE_ERROR = 38,
    JOBADD_ERROR = 39,
    UPDATESTATE_COUNT = 40,
    DOWNLOAD_COUNT = 41,
    PROGRESS_CHANGED = 42,
    VIEWER_CREATED = 43,
    VIEWER_REMOVED = 44,
    VIEWER_NAVIGATION_STARTED = 45,
    VIEWER_NAVIGATION_ENDED = 46,
    TRANSCODER_COMMMAND_REQUESTED = 47,
    SESSION_STATE_CHANGED = 48,
    STREAM_STATE_CHANGED = 49,
    MEMBER_JOINED = 50,
    MEMBER_UPDATED = 51,
    MEMBER_LEFT = 52,
    STATE_SYNC = 53,
    SESSION_PARAMETER_CHANGED = 54,
    SCENARIO_LOADED = 55,
    SERVICE_REQUEST = 56,
    SESSION_TRANSFER = 57,
    BACKGROUND_CLICKED = 58,
    VIEW_CHANGED = 59,
    WEBVIS_RESET = 60,
    RENDER_SETUP_REQUEST = 61,
    REQUEST_CONTEXT_MENU = 62,
    CONTEXT_MENU_INTERACTION = 63,
    CUSTOM_UI_REQUEST = 64,
    CREDENTIALS_AQUISITION_UPDATE = 65,
    VIEWPORT_CHANGED = 66,
    CUSTOM_NODE_ADDED = 67,
    CLIPPING_ROOM_REMOVED = 68,
    ANIMATION_STARTED = 69,
    ANIMATION_ITERATION = 70,
    ANIMATION_ENDED = 71,
    ANIMATION_FRAMES_CREATED = 72,
    ANIMATION_FRAMES_REMOVED = 73,
    CUSTOM_PROPERTY_REGISTERED = 74,
    ATTACHMENT_CREATED = 75,
    ATTACHMENT_DATA_CHANGED = 76,
    ATTACHMENT_REMOVED = 77,
    SNAPSHOT_RESTORE_STARTED = 78,
    LAYERFILTER_UNREGISTERED = 79,
    SNAPSHOT_CREATION_STARTED = 80,
    NODES_REMOVED = 81,
    NODES_CHANGED = 82,
    INTERNAL_SNAPSHOT_CREATED = 83,
    XR_MEMBER_ADDED = 84,
    XR_MEMBER_REMOVED = 85,
    XR_MEMBER_CAPABILITIES_CHANGED = 86,
    XR_MEMBER_MODELTRACKER_INFO_RECEIVED = 87,
    XR_MEMBER_MODELTRACKER_EDGEIMG_RECEIVED = 88,
    XR_SESSION_STATE_CHANGED = 89,
    XR_MEMBER_STATE_CHANGED = 90,
    NODE_PROPERTIES_RESET = 91,
    EVENT_TYPE_COUNT = 92
}

export enum HTMLColor {
    black = "#000000",
    silver = "#C0C0C0",
    gray = "#808080",
    grey = "#808080",
    white = "#FFFFFF",
    maroon = "#800000",
    red = "#FF0000",
    purple = "#800080",
    fuchsia = "#FF00FF",
    green = "#008000",
    lime = "#00FF00",
    olive = "#808000",
    yellow = "#FFFF00",
    navy = "#000080",
    blue = "#0000FF",
    teal = "#008080",
    aqua = "#00FFFF",
    darkblue = "#00008B",
    mediumblue = "#0000CD",
    darkgreen = "#006400",
    darkcyan = "#008B8B",
    deepskyblue = "#00BFFF",
    darkturquoise = "#00CED1",
    mediumspringgreen = "#00FA9A",
    springgreen = "#00FF7F",
    cyan = "#00FFFF",
    midnightblue = "#191970",
    dodgerblue = "#1E90FF",
    lightseagreen = "#20B2AA",
    forestgreen = "#228B22",
    seagreen = "#2E8B57",
    darkslategray = "#2F4F4F",
    darkslategrey = "#2F4F4F",
    limegreen = "#32CD32",
    mediumseagreen = "#3CB371",
    turquoise = "#40E0D0",
    royalblue = "#4169E1",
    steelblue = "#4682B4",
    darkslateblue = "#483D8B",
    mediumturquoise = "#48D1CC",
    indigo = "#4B0082",
    darkolivegreen = "#556B2F",
    cadetblue = "#5F9EA0",
    cornflowerblue = "#6495ED",
    rebeccapurple = "#663399",
    mediumaquamarine = "#66CDAA",
    dimgray = "#696969",
    dimgrey = "#696969",
    slateblue = "#6A5ACD",
    olivedrab = "#6B8E23",
    slategray = "#708090",
    slategrey = "#708090",
    lightslategray = "#778899",
    lightslategrey = "#778899",
    mediumslateblue = "#7B68EE",
    lawngreen = "#7CFC00",
    chartreuse = "#7FFF00",
    aquamarine = "#7FFFD4",
    skyblue = "#87CEEB",
    lightskyblue = "#87CEFA",
    blueviolet = "#8A2BE2",
    darkred = "#8B0000",
    darkmagenta = "#8B008B",
    saddlebrown = "#8B4513",
    darkseagreen = "#8FBC8F",
    lightgreen = "#90EE90",
    mediumpurple = "#9370DB",
    darkviolet = "#9400D3",
    palegreen = "#98FB98",
    darkorchid = "#9932CC",
    yellowgreen = "#9ACD32",
    sienna = "#A0522D",
    brown = "#A52A2A",
    darkgray = "#A9A9A9",
    darkgrey = "#A9A9A9",
    lightblue = "#ADD8E6",
    greenyellow = "#ADFF2F",
    paleturquoise = "#AFEEEE",
    lightsteelblue = "#B0C4DE",
    powderblue = "#B0E0E6",
    firebrick = "#B22222",
    darkgoldenrod = "#B8860B",
    mediumorchid = "#BA55D3",
    rosybrown = "#BC8F8F",
    darkkhaki = "#BDB76B",
    mediumvioletred = "#C71585",
    indianred = "#CD5C5C",
    peru = "#CD853F",
    chocolate = "#D2691E",
    tan = "#D2B48C",
    lightgray = "#D3D3D3",
    lightgrey = "#D3D3D3",
    thistle = "#D8BFD8",
    orchid = "#DA70D6",
    goldenrod = "#DAA520",
    palevioletred = "#DB7093",
    crimson = "#DC143C",
    gainsboro = "#DCDCDC",
    plum = "#DDA0DD",
    burlywood = "#DEB887",
    lightcyan = "#E0FFFF",
    lavender = "#E6E6FA",
    darksalmon = "#E9967A",
    violet = "#EE82EE",
    palegoldenrod = "#EEE8AA",
    lightcoral = "#F08080",
    khaki = "#F0E68C",
    aliceblue = "#F0F8FF",
    honeydew = "#F0FFF0",
    azure = "#F0FFFF",
    sandybrown = "#F4A460",
    wheat = "#F5DEB3",
    beige = "#F5F5DC",
    whitesmoke = "#F5F5F5",
    mintcream = "#F5FFFA",
    ghostwhite = "#F8F8FF",
    salmon = "#FA8072",
    antiquewhite = "#FAEBD7",
    linen = "#FAF0E6",
    lightgoldenrodyellow = "#FAFAD2",
    oldlace = "#FDF5E6",
    magenta = "#FF00FF",
    deeppink = "#FF1493",
    orangered = "#FF4500",
    tomato = "#FF6347",
    hotpink = "#FF69B4",
    coral = "#FF7F50",
    darkorange = "#FF8C00",
    lightsalmon = "#FFA07A",
    orange = "#FFA500",
    lightpink = "#FFB6C1",
    pink = "#FFC0CB",
    gold = "#FFD700",
    peachpuff = "#FFDAB9",
    navajowhite = "#FFDEAD",
    moccasin = "#FFE4B5",
    bisque = "#FFE4C4",
    mistyrose = "#FFE4E1",
    blanchedalmond = "#FFEBCD",
    papayawhip = "#FFEFD5",
    lavenderblush = "#FFF0F5",
    seashell = "#FFF5EE",
    cornsilk = "#FFF8DC",
    lemonchiffon = "#FFFACD",
    floralwhite = "#FFFAF0",
    snow = "#FFFAFA",
    lightyellow = "#FFFFE0",
    ivory = "#FFFFF0"
}


export interface LayerVolumeResult {
    volumes: Array<BoxVolume>;
    layers: Array<Array<number>>;
}

export enum NavigationPerformance {
    "%performance_best_quality" = 0,
    "%performance_better_quality" = 1,
    "%performance_balanced" = 2,
    "%performance_better_performance" = 3,
    "%performance_best_performance" = 4
}

export enum NodeRepresentation {
    PART = 1,
    LINKED_PART = 2,
    ASSEMBLY = 4,
    EMPTY_PART = 8,
    COLLAPSED_ASSEMBLY = 16,
    EXPANDED_ASSEMBLY = 64,
    LOADING = 128
}

export enum NodeType {
    NONE = 0,
    STRUCTURE = 1,
    AUX = 2,
    CUSTOM = 4,
    ALL = 7,
    COLLECTION = 8,
    MODELVIEW = 18,
    CLIPPLANE = 34,
    CLIPROOM = 66,
    MARKER = 130,
    TEXT = 258,
    DIMENSION = 514,
    ANNOTATION = 1026
}

export enum NotificationLevel {
    FATAL = 0,
    ERROR = 1,
    WARNING = 2,
    INFORMATION = 3,
    DEBUG = 5,
    TRACE = 6
}

export enum PrintLayout {
    AUTO = 0,
    PORTRAIT = 1,
    LANDSCAPE = 2
}

export enum PrintQuality {
    DEFAULT = 0,
    AUTO = 1,
    LOW = 2,
    MEDIUM = 3,
    HIGH = 4
}

export enum PropID {
    parent = 0,
    children = 1,
    localTransform = 2,
    globalTransform = 3,
    localVolume = 4,
    globalVolume = 5,
    appearanceURI = 6,
    enabled = 7,
    pickable = 8,
    selected = 9,
    infoState = 10,
    label = 11,
    names = 12,
    depth = 13,
    materialURI = 14,
    nodeRepresentation = 15,
    resourceState = 16,
    hasAuxStructure = 17,
    auxEnabled = 18,
    renderMode = 19,
    randomColor = 20,
    hidden = 21,
    highlightGroups = 22,
    metaRef = 23,
    materialRef = 24,
    auxContent = 25,
    auxNodes = 26,
    activatable = 27,
    modelViews = 28,
    type = 29,
    subType = 30,
    attachment = 31,
    animation = 32,
    exclusiveClipplanes = 33
}

export enum Properties {
    /**
     * The ID of the node’s parent node.
     * @READONLY
     * @Not_recursive_by_default
     */
    parent = 0,
    /**
     * The list of IDs of the node’s child nodes.
     * @READONLY
     * @Not_recursive_by_default
     */
    children = 1,
    /**
     * The transformation matrix that is put on the transformation stack for the node. The
     * transformation is applied to local geometry and all children.
     * @READONLY
     * @Not_recursive_by_default
     */
    localTransform = 2,
    /**
     * READONLY. The stacked transformation matrix for the node. The transformation is applied
     * to local geometry and all children.
     * @READONLY
     * @Not_recursive_by_default
     */
    globalTransform = 3,
    /**
     * The axis-aligned bounding box of the local geometry in the local coordinate system.
     * @Not_recursive_by_default
     */
    localVolume = 4,
    /**
     * The axis-aligned bounding box of the node’s geometry and all child nodes, given
     * in the global coordinate system.
     * @READONLY
     * @Not_recursive_by_default
     */
    globalVolume = 5,
    /**
     * A resource identifier used to overwrite an appearance. Can be an URI to an external resource
     * e.g. <code>"http://foo.bar"</code> or named resource like <code>"urn:X-l3d:color:red"</code>.
     * @Not_recursive_by_default
     */
    appearanceURI = 6,
    /**
     * Sets whether a node is shown or hidden.
     * @Recursive_by_default
     */
    enabled = 7,
    /**
     * Shows whether a node is pickable in the 3D view.
     * @READONLY
     * @Recursive_by_default
     */
    pickable = 8,
    /**
     * Shows whether a node is in the current selection.
     * @READONLY
     * @Recursive_by_default
     */
    selected = 9,
    /**
     * A string to be displayed to the user in UI Elements.
     * @Not_recursive_by_default
     */
    label = 10,
    /**
     * Shows if a node has additional aux structures.
     * @Not_recursive_by_default
     */
    hasAuxStructure = 11
}

export type PropertyName = "activatable" | "animation" | "appearanceURI" | "attachment" | "auxContent" | "auxEnabled" | "auxNodes" | "children" | "depth" | "enabled" | "exclusiveClipplanes" | "globalTransform" | "globalVolume" | "hasAuxStructure" | "hidden" | "highlightGroups" | "infoState" | "label" | "localTransform" | "localVolume" | "metaRef" | "materialRef" | "materialURI" | "modelViews" | "names" | "nodeRepresentation" | "parent" | "pickable" | "randomColor" | "renderMode" | "resourceState" | "selected" | "subType" | "type" | string;







export type PropertyType<T> = T extends "activatable" ? boolean : T extends "animation" ? any : T extends "appearanceURI" ? string : T extends "attachment" ? any : T extends "auxContent" ? any : T extends "auxEnabled" ? EnabledState | boolean : T extends "auxNodes" ? number[] : T extends "children" ? number[] : T extends "depth" ? number : T extends "enabled" ? EnabledState | boolean : T extends "exclusiveClipplanes" ? number[] : T extends "globalTransform" ? Float32Array : T extends "globalVolume" ? BoxVolume : T extends "hasAuxStructure" ? boolean : T extends "hidden" ? boolean : T extends "highlightGroups" ? number : T extends "infoState" ? NodeInfoState : T extends "label" ? string : T extends "localTransform" ? Float32Array : T extends "localVolume" ? BoxVolume : T extends "metaRef" ? string : T extends "materialRef" ? any : T extends "materialURI" ? string : T extends "modelViews" ? number[] : T extends "names" ? string[] : T extends "nodeRepresentation" ? NodeRepresentation : T extends "parent" ? number : T extends "pickable" ? boolean : T extends "randomColor" ? string : T extends "renderMode" ? RenderMode : T extends "resourceState" ? L3DResourceClientState : T extends "selected" ? boolean : T extends "subType" ? string : T extends "type" ? NodeType : any;

export enum RenderMode {
    Faces = 0,
    Topology = 1,
    FacesTopology = 2,
    Occluder = 3,
    OccluderTopology = 4
}

export enum ResponseType {
    TEXT = "text",
    JSON = "json",
    ARRAYBUFFER = "arraybuffer",
    BLOB = "blob",
    DOCUMENT = "document"
}

export enum SettingStrings {
    /**
     *
     * @type String
     * @key_string hubURL
     **/
    HUB_URL = "hubURL",
    /**
     *
     * @type String
     * @key_string hubInterfaceVersion
     **/
    HUB_INTERFACE_VERSION = "hubInterfaceVersion",
    /**
     *
     * @key_string renderServiceURL
     */
    RENDER_SERVICE_URL = "renderServiceURL",
    /**
     *
     * @type String
     * @key_string appId
     */
    APP_ID = "appId",
    /**
     * Sets the unit for data inside the webVis UI.
     * @type  option :        ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"]
     * @key_string dataUnit
     */
    DATA_UNIT = "dataUnit",
    /**
     * Enables or disables the display of the 3D label tooltip.
     * @type Boolean
     * @key_string labelTooltipEnabled
     */
    LABEL_TOOLTIP_ENABLED = "labelTooltipEnabled",
    /**
     * Shows the selected render configuration.
     * @type string
     * @key_string renderConfig
     */
    SELECTED_RENDER_CONFIGURATION = "renderConfig",
    /**
     * The list of possible domain gateways in the infrastructure
     * @type Array<string>
     * @key_ domainGateways
     */
    DOMAIN_GATEWAYS = "domainGateways",
    /**
     * Only use this if you know what you are doing.
     * @type JSON
     * @key_ gatewayMapping
     */
    GATEWAY_MAPPING = "gatewayMapping",
    /**
     * A map to rewrite the uri to the network
     * @type Array<Object>
     * @key_ uriMap
     */
    URI_MAP = "uriMap",
    /**
     * Limit for GPU memory.
     * @type Number
     * @key_string maxGPUMemory
     */
    MAX_GPU_MEMORY = "maxGPUMemory",
    /**
     * @type Number
     * @key_string gpuMemoryReleaseFactor
     */
    GPU_MEMORY_RELEASE_FACTOR = "gpuMemoryReleaseFactor",
    /**
     * Limit for CPU-side memory (RAM).
     * @type Number
     * @key_string maxSRCCPUMemory
     */
    MAX_SRC_MEMORY = "maxSRCCPUMemory",
    /**
     * Small feature threshold in pixel.
     * @type number
     * @key_string smallFeaturePixelThreshold
     */
    SMALL_FEATURE_PIXEL_THRESHOLD = "smallFeaturePixelThreshold",
    /**
     * Enable small feature culling.
     * @type Boolean
     * @key_string smallFeatureCulling
     */
    SMALL_FEATURE_CULLING = "smallFeatureCulling",
    /**
     * Enabled state for topology points.
     * @type Boolean
     * @key_string topoPointsEnabled
     */
    TOPO_POINTS_ENABLED = "topoPointsEnabled",
    /**
     * Enabled vertex color rendering.
     * @type Boolean
     * @key_string vertexColorsEnabled
     */
    VERTEX_COLORS_ENABLED = "vertexColorsEnabled",
    /**
     * Sampling factor during navigation.
     * @type number
     * @key_string navigationSampling
     */
    NAVIGATION_SAMPLING = "navigationSampling",
    /**
     * Enable/Disable in snapshot tab, the option of saving it.
     * @type Boolean
     * @key_string smallFeatureCulling
     */
    SNAPSHOT_ICON_SAVE = "snapshotIconSave",
    /**
     * Enable/Disable in snapshot tab, the option of restoring view.
     * @type Boolean
     * @key_string smallFeatureCulling
     */
    SNAPSHOT_ICON_RESTORE_VIEW = "snapshotRestoreView",
    /**
     * Enable/Disable the session storage.
     * @type Boolean
     * @key_string sessionStorageEnabled
     */
    SESSION_STORAGE_ENABLED = "sessionStorageEnabled",
    /**
     * Enable/Disable the session export.
     * @type Boolean
     * @key_string sessionExportEnabled
     */
    SESSION_EXPORT_ENABLED = "sessionExportEnabled",
    /**
     * Preserve drawing buffer on webgl context.
     * @type Boolean
     * @key_string webglPreserveDrawingBuffer
     */
    WEBGL_PRESERVE_DRAWINGBUFFER = "webglPreserveDrawingbuffer",
    /**
     * Enable frustum culling.
     * @type Boolean
     * @key_string frustumCulling
     */
    FRUSTUM_CULLING = "frustumCulling",
    /**
     * Enable software occlusion culling.
     * @type Boolean
     * @key_string soc
     */
    SOFTWAR_OCCLUSION_CULLING = "soc",
    /**
     * Preferred selection method for transcoder commands. With “ASK_USER”, webVis will always
     * ask for the preferred transcoder command, given that there is more than one option, using a dialog.
     * @type option :           ["ASK_USER", "AUTO"]
     * @key_string transcoderCmdSelectionMethod
     */
    TRANSCODER_CMD_SELECTION_METHOD = "transcoderCmdSelectionMethod",
    /**
     * Level-of-Detail to be used for proxy boxes – a value of 0 hides the proxy boxes during loading,
     * higher values enable the use of proxy boxes.
     * @type Number
     * @key_string proxyBoxLevel
     */
    PROXY_BOX_LEVEL = "proxyBoxLevel",
    /**
     * Path to the config file. If this has been set during loading (in webvis-config or as URL parameter),
     * the corresponding config file is used. Otherwise, a default config from the instant3Dhub server is used.
     * @type String
     * @key_string configFilePath
     */
    CONFIG_FILE_PATH = "configFilePath",
    /**
     * TODO document
     * @type Object
     * @key_string userInputMap
     */
    USER_INPUT_MAP = "userInputMap",
    /**
     * Multiplier used to adjust space mouse sensitivity
     * @type Number
     * @key_string spacemouseMultiplier
     */
    SPACEMOUSE_MULTIPLIER = "spacemouseMultiplier",
    /**
     * Inversion if mouse zoom direction
     * @type Boolean
     * @key_string mouseInvertZoomingDirection
     */
    INVERT_ZOOM_DIRECTION = "mouseInvertZoomingDirection",
    /**
     * Toggles the silhouette rendering effect.
     * @type Boolean
     * @key_string silhouetteEffect
     */
    SILHOUETTE_EFFECT_ENABLED = "silhouetteEffect",
    /**
     * Changes the color of the silhouette rendering effect.
     * @type String
     * @key_string silhouetteEffectColor
     */
    SILHOUETTE_EFFECT_COLOR = "silhouetteEffectColor",
    /**
     * Draws only the silhouettes.
     * @type Boolean
     * @key_string silhouetteEffectExclusiveEnabled
     */
    SILHOUETTE_EFFECT_EXCLUSIVE_ENABLED = "silhouetteEffectExclusiveEnabled",
    /**
     * Enables/disables the silhouette effect button
     * @type Boolean
     * @key_string silhouetteEffectButtonEnabled
     */
    SILHOUETTE_EFFECT_BUTTON_ENABLED = "silhouetteEffectButtonEnabled",
    /**
     * Toggles the random part color effect.
     * @type Boolean
     * @key_string colorizeEffect
     */
    COLORIZE_EFFECT_ENABLED = "colorizeEffect",
    /**
     * Toggles the screen space AntiAliasing.
     * @type Boolean
     * @key_string aaSetting
     */
    AA_SETTING_ENABLED = "aaSetting",
    /**
     * Defines the strength of the hover effect when pointing on a part in the 3D view.
     * @type Number
     * @key_string hoverBlendFactor
     */
    HOVER_BLEND_FACTOR = "hoverBlendFactor",
    /**
     * Specifies whether l3d root nodes should be merged into the parent when adding l3ds.
     * @type Boolean
     * @key_string mergeToParentOnAdd
     */
    MERGE_TO_PARENT_ON_ADD = "mergeToParentOnAdd",
    /**
     * Default l3d representation to load.
     * @type option : ["PART", "ASSEMBLY"]
     * @key_string l3dRepresentationDefaults
     */
    L3D_REPRESENTATION_DEFAULTS = "l3dRepresentationDefaults",
    /**
     * Hint about the usage of credentials when issuing HTTP Requests.
     * The given method is used as a first try, the alternative one afterwards, if errors occur.
     * @type Boolean
     * @key_string preferXHRWithCredentials
     */
    PREFER_XHR_WITH_CREDENTIALS = "preferXHRWithCredentials",
    /**
     * A list of cookies that are added to all requests.
     * @type Array
     * @key_string additionalCookies
     */
    ADDITIONAL_COOKIES = "additionalCookies",
    /**
     * Enables or disables session sharing
     * @type Boolean
     * @key_ shareSessionEnabled
     */
    SHARE_SESSION_ENABLED = "shareSessionEnabled",
    /**
     * In this mode all events regarding scene are ignored. This is for the sessionHandler only!
     * @type Boolean
     * @key_ pseudoSessionMode
     */
    PSEUDO_SESSION_MODE = "pseudoSessionMode",
    /**
     * Defines additional device tags that are communicated with the session
     * @type Array
     * @key_ sessionDeviceTags
     */
    SESSION_DEVICE_TAGS = "sessionDeviceTags",
    /**
     * Defines additional device tags that are communicated with the session
     * @type Array
     * @key_ internalSessionDeviceTags
     */
    INTERNAL_SESSION_DEVICE_TAGS = "internalSessionDeviceTags",
    /**
     * A set of descriptors to interact with session members
     * @type Array
     * @key_ sessionInteractions
     */
    SESSION_INTERACTIONS = "sessionInteractions",
    /**
     * A list of remote settings for webvis. The changes can be read from the session parameters
     * @type Array
     * @key_ sessionInteractions
     */
    SESSION_REMOTE_SETTINGS = "sessionRemoteSettings",
    /**
     * The name that should be used when joining a shared session
     * @type String
     * @key_ sessionMemberName
     */
    SESSION_MEMBER_NAME = "sessionMemberName",
    /**
     * The URL the Session-Handler should forward to
     * @type String
     * @key_ sessionForwardUrl
     */
    SESSION_FORWARD_URL = "sessionForwardUrl",
    /**
     * Search recursively
     * @type Boolean
     * @key_string recursiveUIsearch
     */
    RECURSIVE_UI_SEARCH = "recursiveUISearch",
    /**
     * Enabdles the debug mode
     * @type Boolean
     * @key_string debug
     */
    DEBUG = "debug",
    /**
     * Triggers GC on IE every n frames
     * @type Number
     * @key_string garbageCollectionCycle
     */
    GARBAGE_COLLECTION_CYCLE = "garbageCollectionCycle",
    /**
     * Maximum number of concurrent downloads
     * @type Number
     * @key_string maxConcurrentDownloads
     */
    MAX_CONCURRENT_DOWNLOADS = "maxConcurrentDownloads",
    /**
     * Mode selection for hovering label
     * @type string
     * @type option : ["NODE_LABEL", "RESOURCE_LABEL"]
     */
    HOVERING_LABEL_MODE = "hoveringLabelMode",
    /**
     * CustomTreeIconMap
     * @type string
     * @key_string customTreeIconMap
     */
    CUSTOM_TREE_ICON_MAP = "customTreeIconMap",
    /**
     * Custom Toolbar Icons
     * @type string
     * @key_string customToolbarIconMap
     */
    CUSTOM_TOOLBAR_ICON_MAP = "customToolbarIconMap",
    /**
     * L3D interface
     * @type option : ["data", "raw"]
     * @key_string l3dInterface
     */
    L3D_INTERFACE = "l3dInterface",
    /**
     * Fit on first enable
     * @type Boolean
     * @key_string initialFit
     */
    INITIAL_FIT = "initialFit",
    /**
     * Enable/ disable in color dialog a text control with the color code
     * @type Boolean
     * @key_string initialFit
     */
    COLOR_DIALOG_ENABLE_HTML_COLOR_CODE = "colorDialogEnableHtmlColorCode",
    /**
     * key-value pairs of custom css properties for themes.
     * @type Object
     * @key_string customCSSMap
     */
    CUSTOM_CSS_MAP = "customCSSMap",
    /**
     * Color for the topological geometry.
     * @type String
     * @key_string topoGeometryColor
     */
    TOPO_GEOMETRY_COLOR = "topoGeometryColor",
    /**
     * Color for the topological geometry.
     * @type String
     * @key_string topoGeometryColor
     */
    TOPO_GEOMETRY_SECONDARY_COLOR = "topoGeometrySecondaryColor",
    /**
     * The minimum delay between two update state requests.
     * @type Number
     * @key_string updateStatePollingInterval
     */
    UPDATE_STATE_POLLING_INTERVAL = "updateStatePollingInterval",
    /**
     * The minimum delay between two getL3DInfo requests.
     * @type Number
     * @key_string sessionSyncPollingInterval
     */
    SESSION_SYNC_POLLING_INTERVAL = "sessionSyncPollingInterval",
    /**
     * The maximum number of elements to check with one request
     * @type Number
     * @key_string updateStateElementCount
     */
    UPDATE_STATE_ELEMENT_COUNT = "updateStateElementCount",
    /**
     * The maximum number of parallel updateState request
     * @type Number
     * @key_string updateStateNumParallelRequests
     */
    UPDATE_STATE_MAX_NUM_PARALLEL_REQUESTS = "updateStateNumParallelRequests",
    /**
     * The maximum number of requests to queue before sending a new request
     * @type Number
     * @key_string updateStateMaxNumWaitingQueriesThreshold
     */
    UPDATE_STATE_MAX_NUM_WAITING_QUERIES_THRESHOLD = "updateStateMaxNumWaitingQueriesThreshold",
    /**
     * The budget in ms to process updateState results per frame
     * @type Number
     * @key_string updateStateProcessingBudget
     */
    UPDATE_STATE_PROCESSING_BUDGET = "updateStateProcessingBudget",
    /**
     * The block size to process updateState per frame before budget check
     * @type Number
     * @key_string updateStateProcessingBlockSize
     */
    UPDATE_STATE_PROCESSING_BLOCK_SIZE = "updateStateProcessingBlockSize",
    /**
     * The maximum number of parallel external reference requests
     * @type Number
     * @key_string externalReferencesNumParallelRequests
     */
    EXT_REF_MAX_NUM_PARALLEL_REQUESTS = "externalReferencesNumParallelRequests",
    /**
     * The budget in ms to process externalReferences per frame
     * @type Number
     * @key_string externalReferencesProcessingBudget
     */
    EXT_REF_PROCESSING_BUDGET = "externalReferencesProcessingBudget",
    /**
     * The block size to process externalReferences per frame before budget check
     * @type Number
     * @key_string externalReferencesProcessingBlockSize
     */
    EXT_REF_PROCESSING_BLOCK_SIZE = "externalReferencesProcessingBlockSize",
    /**
     * A function to define the content of tooltips.
     * @type Function (names : Array<string>)
     * @key_string labelTooltipFunction
     */
    LABEL_TOOLTIP_FUNCTION = "labelTooltipFunction",
    /**
     * The
     * @type Boolean
     * @key_string userInputMaps
     */
    NAVIGATION_MODE = "navigationMode",
    /**
     * The
     * @type Boolean
     * @key_string userInputMaps
     */
    SCREEN_SPACE_COVERAGE_CALCULATION_METHOD = "screenSpaceCoverageCalculationMethod",
    /**
     * Counter variable that is increased every time the application is loaded
     * @type Boolean
     * @key_string gizmosEnabled
     */
    SESSION_COUNTER = "sessionCounter",
    /**
     * Sets if XHR pooling is enabled
     * @type Boolean
     * @key_string xhrPoolingEnabled
     */
    XHR_POOLING_ENABLED = "xhrPoolingEnabled",
    /**
     * Ignore unauthorized certificates when running in node
     * @type Boolean
     * @key_string skipSslVerify
     */
    SKIP_SSL_VERIFY = "skipSslVerify",
    /**
     * Enables the upload field in the add dialog
     * @type Boolean
     * @key_string enableFileUpload
     */
    ENABLE_FILE_UPLOAD = "enableFileUpload",
    /**
     * Target URL for file uploads
     * @type string
     * @key_string fileUploadURL
     */
    FILE_UPLOAD_URL = "fileUploadURL",
    /**
     * Sets the ping interval for the measurement service
     * @type number
     * @key_string measurementPingInterval
     */
    MEASUREMENT_SERVICE_PING_INTERVAL = "measurementServicePingInterval",
    /**
     * Sets the ping interval for the render service
     * @type number
     * @key_string measurementPingInterval
     */
    RENDER_SERVICE_PING_INTERVAL = "renderServicePingInterval",
    /**
     *
     * @type String
     * @key_string renderServiceUUID
     */
    RENDER_SERVICE_UUID = "renderServiceUUID",
    /**
     * Set whether the experimental content-types are going to be differentiated from other types, when they are listed in the add-dialog
     * @type boolean
     * @key_string markExperimentalContentTypes
     */
    MARK_EXPERIMENTAL_CONTENT_TYPES = "markExperimentalContentTypes",
    /**
     * The sessionID to join
     * @type
     * @key_ sessionID
     */
    SESSION_ID = "sessionId",
    /**
     * Sets webvis to the offline mode
     * @type boolean
     * @key_ offlineMode
     */
    OFFLINE_MODE = "offlineMode",
    /**
     * if this is set webvis will not try to connect to a booster
     * @type boolean
     * @key_ ignoreBooster
     */
    IGNORE_BOOSTER = "ignoreBooster",
    /**
     * The endpoint where webvis tries to connect to the booster
     * @type string
     * @key_ boosterRestEndpoint
     */
    BOOSTER_REST_ENDPOINT = "boosterRestEndpoint",
    /**
     * The endpoint where webvis tries to connect to the booster
     * @type string
     * @key_ boosterWSEndpoint
     */
    BOOSTER_WS_ENDPOINT = "boosterWSEndpoint",
    /**
     * The space domain of webvis
     * @type string
     * @key_ spaceDomain
     */
    SPACE_DOMAIN = "spaceDomain",
    /**
     * List of streams to publish
     * @type string
     * @key_string streamPublishList
     */
    STREAM_PUBLISH_LIST = "streamPublishList",
    /**
     * Sets the number of instances that are created per frame in the createChildInstances loop
     * @type number
     * @key_string childInstanceCreationsPerFrame
     */
    CHILD_INSTANCE_CREATIONS_PER_FRAME = "childInstanceCreationsPerFrame",
    /**
     * Sets the interval length in milliseconds for downloading when the tab has lost focus
     * @type number
     * @key_ backgroundDownloadInterval
     */
    BACKGROUND_DOWNLOAD_INTERVAL = "backgroundDownloadInterval",
    /**
     * Sets/gets the current availability of the 3 color comparison
     * @type Boolean
     * @key_string childInstanceCreationsPerFrame
     */
    COLOR_COMPARISON_AVAILABLE = "colorComparisonAvailable",
    /**
     * Sets/gets the current availability of the 3 color comparison
     * @type Boolean
     * @key_string childInstanceCreationsPerFrame
     */
    BACKGROUND_COLOR = "backgroundColor",
    /**
     * Label used for branding. It is shown as an HTML link on the viewer and linked to BRANDING_URL.
     * @type String
     * @key_ brandingLabel
     */
    BRANDING_LABEL = "brandingLabel",
    /**
     * URL to which the Branding Label points.
     * @type String
     * @key_ brandingURL
     */
    BRANDING_URL = "brandingURL",
    /**
     * Sets the language for the UI s.
     * @type option     ["en", "de", "fr", "zh"]
     * @key_ language
     */
    LANGUAGE = "language",
    /**
     * Defines the front plane of the model for use with the UI elements.
     * @type option          ["-yz", "xy", …]
     * @key_ coordSys
     */
    COORDINATE_SYSTEM = "coordSys",
    /**
     * Sets the unit for data inside the webVis UI.
     * @type option          ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"]
     * @key_ uiUnit
     */
    UI_UNIT = "uiUnit",
    /**
     * Line width to be used for measurements.
     * @type Number
     * @key_ overlayLineWidth
     */
    OVERLAY_LINE_WIDTH = "overlayLineWidth",
    /**
     * Angular tolerance for measurements, in degrees.
     * This value can be used to treat almost-perpendicular cases as perpendicular,
     * which allows to measure orthogonal distances between almost-perpendicular planes or lines.
     * @type number
     * @key_ measurementAngularTolerance
     */
    MEASUREMENT_ANGULAR_TOLERANCE = "measurementAngularTolerance",
    /**
     * A RGB or RGBA color value for the measurement lines as hexadecimal tuple (ex. “FF880088”). The A channel
     * defines the blend factor with the original material. The capping color is can be disabled by setting
     * the A channel to “00”.
     * @type {}
     * @key_ overlayLineColor
     */
    OVERLAY_LINE_COLOR = "overlayLineColor",
    /**
     * Toggles the capping color effect for the 3D clip planes.
     * @type Boolean
     * @key_ clipplaneCappingEnabled
     */
    CLIPPLANE_CAPPING_ENABLED = "clipplaneCappingEnabled",
    /**
     * Enables/Disables the gizmos for manipulating 3D entities in the viewer.
     * @type Boolean
     * @key_ gizmosEnabled
     */
    GIZMOS_ENABLED = "gizmosEnabled",
    /**
     * A RGB or RGBA color value for the capping edge color as hexadecimal tupel (ex. “FF880088”). The A channel
     * defines the blend factor with the original material. The capping color can be disabled by setting
     * the alpha channel to “00”.
     * @type String
     * @key_ clipplaneEdgeColor
     */
    CLIPPLANE_EDGE_COLOR = "clipplaneEdgeColor",
    /**
     * Fill color for the clip plane 3D visualization.
     * The respective effect can be disabled by setting the alpha channel to “00”.
     * @type String
     * @key_ clipplaneInnerColor
     */
    CLIPPLANE_INNER_COLOR = "clipplaneInnerColor",
    /**
     * Increment for the clipplane spinner elements of webVis UI.
     * @type Number
     * @key_ clipplaneSpinnerIncrement
     */
    CLIPPLANE_SPINNER_INCREMENT = "clipplaneSpinnerIncrement",
    /**
     * Color to be used to indicate selected parts in the 3D view.
     * @type String
     * @key_ selectionColor
     */
    SELECTION_COLOR = "selectionColor",
    /**
     * Color to be used to indicate the parts the user is interacting with in the 3D scene.
     * @type String
     * @key_ preSelectionColor
     */
    PRE_SELECTION_COLOR = "preSelectionColor",
    /**
     * Color to be used to indicate the parts the user is interacting with in the 3D scene.
     * @type String
     * @key_ measurementHighlightFaceColor
     */
    MEASUREMENT_HIGHLIGHT_FACE_COLOR = "measurementHighlightFaceColor",
    /**
     * Color to be used to indicate the parts the user is interacting with in the 3D scene.
     * @type String
     * @key_ measurementHighlightLineColor
     */
    MEASUREMENT_HIGHLIGHT_LINE_COLOR = "measurementHighlightLineColor",
    /**
     * Color to be used to indicate selected faces in the 3D view.
     * @type String
     * @key_ preSelectionColor
     */
    FACE_SELECTION_COLOR = "faceSelectionColor",
    /**
     * Color for painted geometry.
     * @type String
     * @key_ paintColor
     */
    PAINT_COLOR = "paintColor",
    /**
     * Size for painted geometry.
     * @type Number
     * @key_ paintSize
     */
    PAINT_SIZE = "paintSize",
    /**
     * Enables the paint mode.
     * @type Boolean
     * @key_ paintModeAvailable
     */
    PAINT_MODE_AVAILABLE = "paintModeAvailable",
    /**
     * Maximum dynamic clipping distance.
     * @type Number
     * @key_ maxDynamicClipDistance
     */
    MAX_DYNAMIC_CLIP_DIST = "maxDynamicClipDistance",
    /**
     * Log levels activated for notifications.
     * The value is an array of s. Valid entries are
     * "TRACE", "DEBUG", INFORMATION", "WARNING", "ERROR" and "FATAL".
     * @type Array
     * @key_ notificationLogLevels
     */
    NOTIFICATION_LOG_LEVELS = "notificationLogLevels",
    /**
     * A single value. All messages with a lower log level are logged
     * One of "TRACE", "DEBUG", INFORMATION", "WARNING", "ERROR" or "FATAL".
     * @type Array
     * @key_ notificationLogLevels
     */
    LOG_LEVEL = "logLevel",
    /**
     * Deactivate PMIs on resource deactivation.
     * @type Boolean
     * @key_ deactivatePmiOnResourceDeactivation
     */
    DEACTIVATE_PMI_ON_RESOURCE_DEACTIVATION = "deactivatePmiOnResourceDeactivation",
    /**
     * Enables/disables the Add button in webvis-full
     * @type Boolean
     * @key_ addButtonEnabled
     */
    ADD_BUTTON_ENABLED = "addButtonEnabled",
    /**
     * Changes the name scheme for scene directions. Valid entries are "insideView" and "outsideView".
     * @type String
     * @key_ SceneDirectionNameScheme
     */
    SCENE_DIRECTION_NAME_SCHEME = "sceneDirectionNameScheme",
    /**
     * Shows/Hides the welcome dialog when the application is loaded
     * @type Boolean
     * @key_ showWelcomeDialog
     */
    SHOW_WELCOME_DIALOG = "showWelcomeDialog",
    /**
     * Sets the performance / quality tradeoff during navigation
     * @type Number
     * @key_ navigationPerformance
     */
    NAVIGATION_PERFORMANCE = "navigationPerformance",
    /**
     * Sets the setup's type for the render
     * @type String  Auto/Select
     * @key_ renderSetup
     */
    RENDER_SETUP = "renderSetup",
    /**
     * Shows/Hide tool windows
     * @type Boolean
     * @key_ showToolWindows
     */
    SHOW_TOOL_WINDOWS = "showToolWindows",
    /**
     * Shows/Hide version info
     * @type Boolean
     * @key_ showVersionInfo
     */
    SHOW_VERSION_INFO = "showVersionInfo",
    /**
     * Send log messages also to the server
     * @type Boolean
     * @key_ sendLogToServer
     */
    SEND_LOG_TO_SERVER = "sendLogToServer",
    /**
     * Scaling factor for the the gizmo geometries
     * @type Number
     * @key_ gizmoScale
     */
    GIZMO_SCALING_FACTOR = "gizmoScalingFactor",
    /**
     * Scaling factor for the the gizmo geometries
     * @type Number
     * @key_ gizmoScale
     */
    DISABLE_DEFAULT_INTERACTION = "disableDefaultInteraction",
    /**
     * A function to modify the context menu's contents
     * This function has as argument: the array with the entries by default of the context menu;
     * and consequently it is expected as a return value, the entries that are wanted to be shown in the context menu:
     *
     * 1. All default entries will be shown:
     *      function(defaultEntries){return defaultEntries}
     *
     * 2. All default entries will be shown, but without the first entry:
     *      function(defaultEntries){
     *          firstEntryPosition = 1;
     *          defaultEntries.splice(firstEntryPosition - 1, 1);
     *          return defaultEntries;
     *      }
     *
     * 3. Swapping the first and second entries:
     *      function(defaultEntries){
     *          firstEntryPosition = 1;
     *          secondEntryPosition = 2;
     *          firstEntry = defaultEntries.splice(firstEntryPosition - 1, 1)[0];
     *          defaultEntries.splice(secondEntryPosition - 1, 0, firstEntry);
     *          return defaultEntries;
     *      }
     *
     * 4. Changing the functionality of the second entry:
     *      function(defaultEntries){
     *          secondEntryPosition = 2;
     *          secondEntryDefaultCommand = defaultEntries[secondEntryPosition - 1].command;
     *          defaultEntries[secondEntryPosition - 1].command = function(nodeId, pickInfo){
     *              console.log("Second Entry was Executed", nodeId, pickInfo);
     *              webvis.getProperty(nodeId, "label").then(
     *                  function(label){
     *                      webvis.postInfo("<table style="border:1px black pointed"><tr><td>Node:<td>" + nodeId +
     *                                      "<tr><td>Label:<td>" + label +
     *                                      "<tr><td>2D Coords:<td>" + pickInfo.canvasCoords +
     *                                      "<tr><td>3D Pos:<td>" + pickInfo.position)+"</table>";
     *              });
     *              secondEntryDefaultCommand();
     *          };
     *          return defaultEntries;
     *      }
     *
     *  5. Inserting a new entry in the menu at the third position:
     *      function(defaultEntries){
     *           newEntry = {
     *              label : "Set Current Language",
     *              subEntries : [
     *                      {
     *                          label : "English",
     *                          command : function(){webvis.changeSetting("language", "en")}
     *                      },
     *                      {
     *                          label : "Deutsch",
     *                          command : function(){webvis.changeSetting("language", "de")}
     *                      },
     *                      {
     *                          label : "Español",
     *                          command : function(){webvis.changeSetting("language", "es")}
     *                      }
     *              ]
     *           };
     *          newEntryPosition = 3;
     *          defaultEntries.splice(newEntryPosition - 1, 0, newEntry);
     *          return defaultEntries;
     *      }
     *
     * 6. Inserting a new entry in the menu, which will appear only after the condition is fulfilled, (e.g. When the node is an Aux node)
     *      function (defaultEntries)
     *       {
     *          const newEntry =
     *                      {
     *                          label : "Custom entry visible only when condition is fulfilled"
     *                          , command : function(nodeID){webvis.postInfo("Custom entry clicked on Aux node:" + nodeID + "!!!")}
     *                          , condition : function(nodeID){return webvis.getNodeType(nodeID) == webvis.NodeType.AUX}
     *                      };
     *          defaultEntries.push(newEntry);
     *          return defaultEntries;
     *       }
     *
     * @type Function (names : Array<ContextMenuEntry>) : Array<ContextMenuEntry>
     * @key_string labelTooltipFunction


     * A function to modify the context menu's contents
     * @type Function (names  Array<ContextMenuEntry>)  Array<ContextMenuEntry>
     * @key_ labelTooltipFunction
     */
    CONTEXT_MENU_FUNCTION = "contextMenuFunction",
    CONTEXT_MENU_ENABLED = "contextMenuEnabled",
    /**
     * Three color comparison matching color
     * @type
     * @key_ colorComparisonMatchingColor
     */
    COLOR_COMPARISON_MATCHING_COLOR = "colorComparisonMatchingColor",
    /**
     * Three color comparison first color
     * @type
     * @key_ colorComparisonFirstColor
     */
    COLOR_COMPARISON_FIRST_COLOR = "colorComparisonFirstColor",
    /**
     * Three color comparison second color
     * @type
     * @key_ colorComparisonSecondColor
     */
    COLOR_COMPARISON_SECOND_COLOR = "colorComparisonSecondColor",
    /**
     * Show experimental render setups
     * @type
     * @key_ experimentalRenderSetups
     */
    SHOW_EXPERIMENTAL_RENDERSETUPS = "experimentalRenderSetups",
    /**
     * Scenario Template for shared sessions
     * @type
     * @key_ scenarioTemplate
     */
    SCENARIO_TEMPLATE = "scenarioTemplate",
    /**
     * Tracking service options
     * @type
     * @key_ trackingServiceOptions
     */
    TRACKING_SERVICE_OPTIONS = "trackingServiceOptions",
    /**
     * Tracking legacy mode includes webtrack for tablet tracking
     * @type
     * @key_ trackingLegacyMode
     */
    TRACKING_LEGACY_MODE = "trackingLegacyMode",
    /**
     * This is for debugging - Slam provider setting.
     * @type string
     * @key_ slamProviderType
     */
    SLAM_PROVIDER_TYPE = "slamProviderType",
    /**
     * Measurement materials densities. The  is parsed as JSON and contains a map from material to density factor.
     * @type
     * @key_ measurementMaterialDensities
     */
    MEASUREMENT_MATERIAL_DENSITIES = "measurementMaterialDensities",
    /**
     * Check for initial state activation
     * @type boolean
     * @key_ initialStateActivation
     */
    INITIAL_STATE_ACTIVATION = "initialStateActivation",
    /**
     * Enables/disables the parent select feature
     * @type boolean
     * @key_ parentSelectEnabled
     */
    PARENT_SELECT_ENABLED = "parentSelectEnabled",
    /**
     * Enables/disables the dynanic center of rotation feature
     * @type boolean
     * @key_string dynamicCOREnabled
     */
    DYNAMIC_COR_ENABLED = "dynamicCOREnabled",
    /**
     * Enables/disables the flyto on double click feature
     * @type boolean
     * @key_string flyToOnDoubleClick
     */
    FLYTO_ON_DOUBLECLICK_ENABLED = "flyToOnDoubleClick",
    /**
     * Enables/disables the vertical limis for the Turntable navigation mode
     * @type boolean
     * @key_string turntableVerticalLimitsEnabled
     */
    TURNTABLE_VERTICAL_LIMITS_ENABLED = "turntableVerticalLimitsEnabled",
    /**
     * Defines the lower the vertical limis for the Turntable navigation mode
     * @type boolean
     * @key_string turntableLowerVerticalLimit
     */
    TURNTABLE_LOWER_VERTICAL_LIMIT = "turntableLowerVerticalLimit",
    /**
     * Defines the upper vertical limis for the Turntable navigation mode
     * @type boolean
     * @key_string turntableUpperVerticalLimit
     */
    TURNTABLE_UPPER_VERTICAL_LIMIT = "turntableUpperVerticalLimit",
    /**
     * Defines the speed for the Fly navigation mode
     * @type boolean
     * @key_string flyNavigationSpeed
     */
    FLY_NAVIGATION_SPEED = "flyNavigationSpeed",
    /**
     * Set an initial search query
     * @type
     * @key_ query
     */
    QUERY = "query",
    /**
     * Set webvis to enable all added data by default
     * @type boolean
     * @key_ autoplay
     */
    AUTOPLAY = "autoplay",
    /**
     * Set data to load on start
     * @type
     * @key_ initData
     */
    INIT_DATA = "initData",
    /**
     * Set a view matrix to show on start
     * @type
     * @key_ initView
     */
    INIT_VIEW = "initView",
    /**
     * Set if aux mode should be available
     * @type
     * @key_ auxModeAvailable
     */
    AUX_MODE_AVAILABLE = "auxModeAvailable",
    /**
     * Set if aux mode searches attached faces recursively
     * @type Boolean
     * @key_ auxModeRecursiveSearch
     */
    AUX_MODE_RECURSIVE_SEARCH = "auxModeRecursiveSearch",
    /**
     * Uncolor all faces when leaving the aux mode
     * @type string
     * @key_string expandOnViewerSelection
     */
    AUX_MODE_UNCOLOR_FACES_ON_LEAVE = "auxModeUncolorFacesOnLeave",
    /**
     * Send query as on batch instead of one per l3d.
     * @type boolean
     */
    BATCHED_QUERY_ENABLED = "batchedQueryEnabled",
    /**
     * Enables/disables decoupled scene traversal
     * @type Boolean
     * @key_string decoupledTraversalEnabled
     */
    DECOUPLED_TRAVERSAL_ENABLED = "decoupledTraversalEnabled",
    /**
     * Enables/disables dynamic aux contrast
     * @type Boolean
     * @key_string dynamicAuxContrastEnabled
     */
    DYNAMIC_AUX_CONTRAST_ENABLED = "dynamicAuxContrastEnabled",
    /**
     * Allows to add custom UI icons
     * @type Object
     * @key_string customIconMap
     */
    CUSTOM_ICON_MAP = "customIconMap",
    /**
     * Sets the content type for the search request
     * @type String
     * @key_string searchRequestContentType
     */
    SEARCH_REQUEST_CONTENT_TYPE = "searchRequestContentType",
    /**
     * Settings object for the locally caching service worker
     * @type ILocalCacheServiceWorkerSetup
     * @key_string localCacheServiceWorker
     */
    LOCAL_CACHE_SERVICE_WORKER = "localCacheServiceWorker",
    /**
     * Expands a subtree to the leaf when selected in the viewer
     * @type string
     * @key_string expandOnViewerSelection
     */
    EXPAND_ON_VIEWER_SELECTION = "expandOnViewerSelection",
    /**
     * Sets the camera field of view in degrees
     * @type number
     * @key_string defaultFieldOfView
     */
    CAMERA_FIELD_OF_VIEW = "defaultFieldOfView",
    /**
     * Sets the print quality
     * @type number
     * @key_string printQuality
     */
    PRINT_QUALITY = "printQuality",
    /**
     * Sets the print layout potrait / landscape
     * @type number
     * @key_string printLayout
     */
    PRINT_LAYOUT = "printLayout",
    /**
     * sets the default loading behaviour on SnapshotRestore
     * @type SnapshotContentselection
     * @key_string snapshotContentSelection
     */
    SNAPSHOT_CONTENT_SELECTION = "snapshotContentSelection",
    /**
     * Sets the current trackingPipeline mode - Options : "default" or "legacy"
     * @type string
     * @key_string trackingPipeline
     */
    TRACKING_PIPELINE = "trackingPipeline",
    /**
     * Enables/Disables the webvis console
     * @type string
     * @key_string consoleEnabled
     */
    CONSOLE_ENABLED = "consoleEnabled",
    /**
     * Enables/Disables the Transformation-Gizmo Button
     * @type string
     * @key_string transformationGizmoEnabled
     */
    TRANSFORMATION_GIZMO_ENABLED = "transformationGizmoEnabled",
    /**
     * ARKit configuration settings - Configuration object contains values for arkitFPS and JPEGCompression.
     * - jpegCompression - values range from 0.0 to 1.0
     * - arkitFps - update framerate for processing.
     * - Current config JSON at <HUB_URL>/repo/webvis/config.json
     *{
     * ...,
     * "arkitConfigs": {
     *      "default": {
     *          "jpegCompression": "0.5",
     *          "arkitFps": "30",
     *          "webviewSettings": {}
     *      }}
     * ...,
     * }
     * @type object
     * @key_string arkitConfigs
     */
    ARKIT_CONFIG = "arkitConfigs",
    /**
     * Enables/Disables the paintings as occluder feature
     * @type string
     * @key_string paintOccluderEnabled
     */
    PAINT_OCCLUDER_ENABLED = "paintOccluderEnabled",
    /**
     * Enables/Disables the transform dialog
     * @type string
     * @key_string transformationDialogEnabled
     */
    TRANSFORMATION_DIALOG_ENABLED = "transformationDialogEnabled",
    /**
     * Default value for the link depth (resource links) for queries
     * @type String
     * @key_string defaultQueryLinkDepth
     */
    DEFAULT_QUERY_LINK_DEPTH = "defaultQueryLinkDepth",
    /**
     * A filtering function which simply defines whether a node, given as argument, should be visible in the tree view.
     * The function returns false for nodes, which should be hidden. Instead, the children of the affected node
     * will be displayed, unless they are also hidden by the filtering function.
     *
     * The respective node will be shown if it has no children
     *
     * The function can return a boolean or a promise-like returning a boolean.
     *
     * @type Function (node : number) : boolean | Promise<boolean>
     * @key_string treeViewFilterFunction
     */
    TREEVIEW_FILTER_FUNCTION = "treeViewFilterFunction",
    /**
     * Delay between retries to connect to the SessionHandlerService in ms
     * @type String
     * @key_string sessionHandlerRetryDelay
     */
    SESSION_HANDLER_RETRY_DELAY = "sessionHandlerRetryDelay",
    /**
     * Maximal number retries to connect to the SessionHandlerService
     * @type String
     * @key_string maxSessionHandlerServiceConnectionRetries
     */
    MAX_SESSION_HANDLER_SERVICE_CONNECTION_RETRIES = "maxSessionHandlerServiceConnectionRetries",
    /**
     * Maximal number retries to connect to the RenderService
     * @type String
     * @key_string maxRenderServiceConnectionRetries
     */
    MAX_RENDER_SERVICE_CONNECTION_RETRIES = "maxRenderServiceConnectionRetries",
    /**
     * Maximal number retries to ping to the RenderService
     * @type String
     * @key_string maxRenderServicePingRetries
     */
    MAX_RENDER_SERVICE_PING_RETRIES = "maxRenderServicePingRetries",
    /**
     * Sets the ping interval for the render service
     * @type String
     * @key_string renderServiceConnectionInterval
     */
    RENDER_SERVICE_CONNECTION_INTERVAL = "renderServiceConnectionInterval",
    /**
     * Specifies a function which returns additional content for the modelview printing
     * Function signature is function(context:contextAPI, nodeID:number, modelViewID:number) : Promise<string>
     * @type String
     * @key_string modelviewPrintContentFunction
     */
    MODELVIEW_PRINT_CONTENT_FUNCTION = "modelviewPrintContentFunction",
    /**
     * Specifies a function which returns custom name for the resource drop-down of the ModelViewPrintDialog
     * Function signature is function(context:contextAPI, nodeID:number) : Promise<string>
     * @type String
     * @key_string modelviewPrintResourceNameFunction
     */
    MODELVIEW_PRINT_RESOURCE_NAME_FUNCTION = "\u00B4modelviewPrintResourceNameFunction",
    /**
     * This limits the range of the active scene volume
     * @type String
     * @key_string maxActiveSceneVolumeDiameter
     */
    MAX_ACTIVE_SCENE_VOLUME_DIAMETER = "maxActiveSceneVolumeDiameter",
    /**
     * Enables/Disables the Annotation editing on double-click
     * @type String
     * @key_string annotationEditingEnabled
     */
    ANNOTATION_EDITING_ENABLED = "annotationEditingEnabled",
    /**
     * Sets the time window for a double click
     * @type number
     * @key_string doubleClickTimeWindow
     */
    DOUBLE_CLICK_TIME_WINDOW = "doubleClickTimeWindow",
    /**
     * Factor to change the navigation speed
     * @type number
     * @key_string navigationSpeedFactor
     */
    NAVIGATION_SPEED_FACTOR = "navigationSpeedFactor",
    /**
     * Factor to throttle the navigation speed when the modifier key is pressed
     * @type number
     * @key_string navigationSpeedThrottleFactor
     */
    NAVIGATION_SPEED_THROTTLE_FACTOR = "navigationSpeedThrottleFactor",
    /**
     * Enables/Disables content validation for annotations from an untrusted source
     * @type boolean
     * @key_string navigationSpeedThrottleFactor
     */
    ALLOW_ANNOTATIONS_FROM_UNTRUSTED_SOURCE = "allowAnnotationsFromUntrustedSource",
    /**
     * Sets the explicitly the webGL version
     * @type number
     * @key_string webglVersion
     */
    WEBGL_VERSION = "webGLVersion",
    /**
     * Enables or disables XR
     * @type Boolean
     * @key_ xrEnabled
     */
    XR_ENABLED = "xrEnabled",
    /**
     * Enables/Disables Capping Geometry creation
     * @type Boolean
     * @key_ cappingCreationEnabled
     */
    CAPPING_CREATION_ENABLED = "cappingCreationEnabled",
    /**
     * Specifies the color of the capping geometries
     * @type string
     * @key_ cappingGeometryColor
     */
    CAPPING_GEOMETRY_COLOR = "cappingGeometryColor",
    /**
     * Enables/Disables the UI for the measurement smart snapping
     * @type Boolean
     * @key_ uiSmartSnappingEnabled
     */
    UI_SMART_SNAPPING_ENABLED = "uiSmartSnappingEnabled",
    /**
     * Specifies additional request headers
     * @type {[key:string]:string}[]
     * @key_ additionalRequestHeaders
     */
    ADDITIONAL_REQUEST_HEADERS = "additionalRequestHeaders"
}

export type UsageString = "open" | "closed" | "auto" | string;

export enum ViewDirection {
    TOP = 0,
    BOTTOM = 1,
    FRONT = 2,
    BACK = 3,
    LEFT = 4,
    RIGHT = 5,
    TOP_BACK_RIGHT = 6,
    TOP_FRONT_RIGHT = 7,
    TOP_BACK_LEFT = 8,
    TOP_FRONT_LEFT = 9,
    BOTTOM_BACK_RIGHT = 10,
    BOTTOM_FRONT_RIGHT = 11,
    BOTTOM_BACK_LEFT = 12,
    BOTTOM_FRONT_LEFT = 13,
    FRONT_LEFT = 14,
    FRONT_RIGHT = 15,
    BACK_LEFT = 16,
    BACK_RIGHT = 17,
    FRONT_TOP = 18,
    FRONT_BOTTOM = 19,
    BACK_TOP = 20,
    BACK_BOTTOM = 21,
    RIGHT_TOP = 22,
    RIGHT_BOTTOM = 23,
    LEFT_TOP = 24,
    LEFT_BOTTOM = 25,
    CURRENT = 26
}

export enum ViewerSettingStrings {
    /**
     * Specifies the lighting environment.
     * @type option	: ["HEADLIGHT", "FOUR_POINT_LIGHTING"]
     */
    LIGHTING_ENVIRONMENT = "lightingEnvironment",
    /**
    * Specifies the type of camera projection.
    * @type option	: ["PERSPECTIVE", "ORTHOGRAPHIC"]
    */
    PROJECTION_TYPE = "projectionType",
    /**
     * Defines the state of dynamic clipping (enabled/disabled).
     * @type boolean
     */
    DYNAMIC_CLIPPING_ENABLED = "dynamicClippingEnabled",
    /**
     * Defines the dynamic clipping distance.
     * @type number
     */
    DYNAMIC_CLIPPING_DISTANCE = "dynamicClippingDistance",
    /**
     * Defines the state of topological rendering (enabled/disabled).
     * @type boolean
     */
    TOPO_ENABLED = "topoEnabled",
    /**
     * Defines the factor the volumes are scaled with for double click animation.
     * @type number
     */
    DOUBLE_CLICK_ANIMATION_VOLUME_SCALE = "doubleClickAnimationVolumeScale",
    /**
     * Defines whether a viewer should focus on a part on double click
     * @type boolean
     */
    FOCUS_ON_DOUBLE_CLICK = "focusOnDoubleClick",
    /**
     * Defines whether a viewer shows the AUX-Geometries during navigation or not
     * @type boolean
     */
    SHOW_AUX_ON_NAVIGATION = "showAuxOnNavigation",
    /**
     * Defines the state of topological points rendering (enabled/disabled).
     * @type boolean
     */
    TOPO_POINTS_ENABLED = "topoPointsEnabled",
    /**
     * Defines whether a viewer shows specular highlighting or not
     * @type boolean
     */
    DISABLE_SPECULAR_HIGHLIGHT = "disableSpecularHighlights",
    /**
     * Defines whether a viewer renders auxiliaries on top or not
     * @type boolean
     */
    RENDER_AUXILIARY_ON_TOP = "renderAuxOnTop",
    /**
     * Defines the render mode
     * @type option	: ["Faces = 0", "Topology= 1", "FacesTopology = 2", "OccluderTopology = 4"]
     */
    RENDER_MODE = "renderMode",
    /**
     * Sets the ratio used to decrease the canvas size for render services
     * @type number
     * @key_string renderServiceCanvasRatio
     */
    RENDERSERVICE_CANVAS_RATIO = "renderServiceCanvasRatio",
    /**
     * Sets the factor for the view fitting
     * @type number
     * @key_string fitViewFactor
     */
    FIT_VIEW_FACTOR = "fitViewFactor",
    /**
     * Specifies if the canvas is scaled by the window.devicePixelRation
     * @type number
     * @key_string useDevicePixelRatio
     */
    USE_DEVICE_PIXEL_RATIO = "useDevicePixelRatio"
}

export enum WebVisStateTarget {
    configParsed = 0,
    sessionSetup = 1,
    preinit = 2,
    init = 3,
    resourceStateUpdated = 4,
    resourceProcessed = 5,
    renderingFinished = 6,
    targetCount = 7
}


















export class WebVisEvent {
    private static _eventCount;
    id: number;
    type?: EventType;
    transactionCode?: string;
    transactionID?: number;
    constructor();
}
export class NodeChangedEvent extends WebVisEvent {
    targetNodeID: number;
    changeList: {
        [key: string]: any;
    };
    transactionID?: number;
    /**
     * The NODE_CHANGED event occurs if one of the Nodes is changed.
     * @param targetNodeID  The ID of the target Node.
     * @param changeList    A List of all changes.
     * @param transactionID The transaction id of the event
     */
    constructor(targetNodeID: number, changeList: {
        [key: string]: any;
    }, transactionID?: number);
}
export class NodesChangedEvent extends WebVisEvent {
    targetNodeIDs: Array<number>;
    propertyName: string;
    propertyValue: any;
    /**
     * The NODES_CHANGED event occurs if one of the Nodes is changed.
     * @param targetNodeIDs The IDs of the changed Nodes.
     * @param propertyName  The name of the changed Property.
     * @param propertyValue The new value of the Property.
     */
    constructor(targetNodeIDs: Array<number>, propertyName: string, propertyValue: any);
}
/**
 * NODE_ADDED
 * @event NODE_ADDED
 */
export class NodeAddedEvent extends WebVisEvent {
    targetNodeID: number;
    parentNodeID: number;
    nodeType: NodeType;
    dataUri: string;
    targetNodeDepth: number;
    label: string;
    properties?: {
        [key: string]: any;
    };
    usage?: UsageString;
    subType?: string;
    contentType?: string;
    /**
     * The NODE_ADDED event occurs if one of the Nodes is added.
     * @param targetNodeID      The ID of the target Node.
     * @param parentNodeID      The ID of the parent Node.
     * @param dataUri           The data URI of the target Node.
     * @param targetNodeDepth   The depth of the target Node.
     * @param label             The label of the target Node.
     * @param properties        A map of all properties on the Node.
     * @param usage             The usage of the target Node.
     */
    constructor(targetNodeID: number, parentNodeID: number, nodeType: NodeType, dataUri: string, targetNodeDepth: number, label: string, properties?: {
        [key: string]: any;
    }, usage?: UsageString, subType?: string, contentType?: string);
}
/**
 * CUSTOM_NODE_ADDED
 * @event CUSTOM_NODE_ADDED
 */
export class CustomNodeAddedEvent extends WebVisEvent {
    targetNodeID: number;
    customType: string;
    attachmentID: number;
    /**
     * The NODE_ADDED event occurs if one of the Nodes is added.
     * @param targetNodeID    The ID of the target Node.
     * @param customType      The custom type of the target Node.
     * @param attachmentID    The ID of the attachment.
     */
    constructor(targetNodeID: number, customType: string, attachmentID: number);
}
/**
 * NODE_REMOVED
 * @event NODE_REMOVED
 */
export class NodeRemovedEvent extends WebVisEvent {
    targetNodeID: number;
    parentNodeID: number;
    /**
     * The NODE_REMOVED event occurs if one of the Nodes is removed.
     * @param targetNodeID      The ID of the target Node.
     * @param parentNodeID      The ID of the parent Node.
     */
    constructor(targetNodeID: number, parentNodeID: number);
}
/**
 * NODES_REMOVED
 * @event NODES_REMOVED
 */
export class NodesRemovedEvent extends WebVisEvent {
    targetNodeIDs: Array<number>;
    /**
     * The NODES_REMOVED event occurs if one or more of the Nodes are removed.
     * @param targetNodeIDs      The IDs of the target Nodes.
     */
    constructor(targetNodeIDs: Array<number>);
}
/**
 * NODE_PROPERTIES_RESET
 * @event NODE_PROPERTIES_RESET
 */
export class NodePropertiesResetEvent extends WebVisEvent {
    targetNodeID: number;
    properties: Array<string>;
    /**
     * The NODE_PROPERTIES_RESET event occurs if one or more properties of the Node get reset.
     * @param targetNodeID      The ID of the target Node.
     * @param properties        The properties which get reset.
     */
    constructor(targetNodeID: number, properties: Array<string>);
}
/**
 * NODE_CLICKED
 * @event NODE_CLICKED
 */
export class NodeClickedEvent extends WebVisEvent {
    targetNodeID: number;
    pointerInfo: IPointerInfo;
    originalEvent: Event;
    /**
     * The NODE_CLICKED event occurs if one of the Nodes is clicked.
     * @param targetNodeID      The ID of the target Node.
     * @param pointerInfo       Additional Pointer Information.
     * @param originalEvent      The original mouse event
     */
    constructor(targetNodeID: number, pointerInfo: IPointerInfo, originalEvent: Event);
}
/**
 * BACKGROUND_CLICKED
 * @event BACKGROUND_CLICKED
 */
export class BackgroundClickedEvent extends WebVisEvent {
    originalEvent: Event;
    /**
     * The BACKGROUND_CLICKED event occurs if the Background is clicked.
     * @param originalEvent      The original mouse event
     */
    constructor(originalEvent: Event);
}
/**
 * VIEW_CHANGED
 * @event VIEW_CHANGED
 */
export class ViewChangedEvent extends WebVisEvent {
    viewer: ViewerAPI;
    matrix: Float32Array;
    /**
     * The BACKGROUND_CLICKED event occurs if the Background is clicked.
     * @param viewer The viewer where the change happend
     * @param matrix The new view matrix
     */
    constructor(viewer: ViewerAPI, matrix: Float32Array);
}
/**
 * REQUEST_CONTEXT_MENU
 * @event REQUEST_CONTEXT_MENU
 */
export class RequestContextMenuEvent extends WebVisEvent {
    provider: any;
    menuData: IContextMenuData;
    /**
     * The REQUEST_CONTEXT_MENU event requests the specified viewer to display its context menu with the given content.
     * @param provider The target component that should handle the request
     * @param menuData IContextMenuData object containing desired menu location, targetNodeID, etc
     */
    constructor(provider: any, menuData: IContextMenuData);
}
/**
 * NODE_POINTER_ENTER
 * @event NODE_POINTER_ENTER
 */
export class NodePointerEnterEvent extends WebVisEvent {
    targetNodeID: number;
    pointerInfo: IPointerInfo;
    originalEvent: Event;
    /**
     * The NODE_POINTER_ENTER event occurs if the mouse pointer enters one of the Nodes.
     * @param targetNodeID      The ID of the target Node.
     * @param pointerInfo       Additional Pointer Information.
     * @param originalEvent     The original mouse event
     */
    constructor(targetNodeID: number, pointerInfo: IPointerInfo, originalEvent: Event);
}
/**
 * NODE_POINTER_OVER
 * @event: NODE_POINTER_OVER
 */
export class NodePointerOverEvent extends WebVisEvent {
    targetNodeID: number;
    pointerInfo: IPointerInfo;
    originalEvent: Event;
    /**
     * The NODE_POINTER_OVER event occurs if the mouse pointer moves over one of the Nodes.
     * @param targetNodeID      The ID of the target Node.
     * @param pointerInfo       Additional Pointer Information.
     * @param originalEvent     The original mouse event
     */
    constructor(targetNodeID: number, pointerInfo: IPointerInfo, originalEvent: Event);
}
/**
 * NODE_POINTER_OUT
 * @event: NODE_POINTER_OUT
 */
export class NodePointerOutEvent extends WebVisEvent {
    targetNodeID: number;
    pointerInfo: IPointerInfo;
    originalEvent: Event;
    /**
     * The NODE_POINTER_OUT event occurs if the mouse pointer leaves one of the Nodes.
     * @param targetNodeID      The ID of the target Node.
     * @param pointerInfo       Additional Pointer Information.
     * @param originalEvent     The original mouse event
     */
    constructor(targetNodeID: number, pointerInfo: IPointerInfo, originalEvent: Event);
}
/**
 * CLIPPLANE_CREATED
 * @event: CLIPPLANE_CREATED
 */
export class ClipPlaneCreatedEvent extends WebVisEvent {
    clipPlaneID: number;
    normal?: Float32Array | Array<number>;
    position?: Float32Array | Array<number>;
    name?: string;
    thickness?: number;
    tangent?: Float32Array | Array<number>;
    disabled?: boolean;
    invisible?: boolean;
    exclusive?: boolean;
    localTransform?: Float32Array;
    /**
     * The CLIPPLANE_CREATED event occurs if a clip plane is created.
     * @param clipPlaneID       The ID of the clip plane.
     * @param normal            The normal of the clip plane.
     * @param point             The position of the clip plane.
     * @param name              The name of the clip plane.
     * @param thickness         Thickness for slice clipping, 0 for a regular clip plane.
     * @param tangent           The plane's tangent vector.
     * @param disabled          The plane is disabled.
     * @param exclusive         clipplane exclusive flag used for excludeclipplanes property
     * @param invisible         The plane is invisible.
     * @param localTransform    The plane local transform.
     */
    constructor(clipPlaneID: number, normal?: Float32Array | Array<number>, position?: Float32Array | Array<number>, name?: string, thickness?: number, tangent?: Float32Array | Array<number>, disabled?: boolean, invisible?: boolean, exclusive?: boolean, localTransform?: Float32Array);
    get point(): Float32Array | number[];
    set point(value: Float32Array | number[]);
}
/**
 * CLIPPLANE_CHANGED
 * @event: CLIPPLANE_CHANGED
 */
export class ClipPlaneChangedEvent extends WebVisEvent {
    clipPlaneID: number;
    normal?: Float32Array | Array<number>;
    position?: Float32Array | Array<number>;
    name?: string;
    thickness?: number;
    tangent?: Float32Array | Array<number>;
    disabled?: boolean;
    invisible?: boolean;
    exclusive?: boolean;
    localTransform?: Float32Array;
    /**
     * The CLIPPLANE_CHANGED event occurs if a clip plane is changed.
     * @param clipPlaneID       The ID of the clip plane.
     * @param normal            The normal of the clip plane.
     * @param point             The position of the clip plane.
     * @param name              The name of the clip plane.
     * @param thickness         Thickness for slice clipping, 0 for a regular clip plane.
     * @param tangent           The plane's tangent vector.
     * @param disabled          The plane's disabled status.
     * @param exclusive         clipplane exclusive flag used for excludeclipplanes property
     * @param invisible         The plane's visibility.
     * @param localTransform    The plane's local transform.
     */
    constructor(clipPlaneID: number, normal?: Float32Array | Array<number>, position?: Float32Array | Array<number>, name?: string, thickness?: number, tangent?: Float32Array | Array<number>, disabled?: boolean, invisible?: boolean, exclusive?: boolean, localTransform?: Float32Array);
    get point(): Float32Array | number[];
    set point(value: Float32Array | number[]);
}
/**
 * CLIPPLANE_REMOVED
 * @event: CLIPPLANE_REMOVED
 */
export class ClipPlaneRemovedEvent extends WebVisEvent {
    clipPlaneID: number;
    clipPlaneType: number;
    /**
     * The CLIPPLANE_REMOVED event occurs if a clip plane is removed.
     * @param clipPlaneID       The ID of the clip plane.
     * @param clipPlaneType     The type of the clip plane.
     */
    constructor(clipPlaneID: number, clipPlaneType: number);
}
/**
 * CLIPPING_ROOM_CREATED
 * @event: CLIPPING_ROOM_CREATED
 */
export class ClippingRoomCreatedEvent extends WebVisEvent {
    clipRoomID: number;
    name?: string;
    size?: Float32Array | Array<number>;
    transformation?: Float32Array | Array<number>;
    disabled?: boolean;
    invisible?: boolean;
    /**
     * The CLIPPING_ROOM_CREATED event occurs if a clip room is created.
     * @param clipRoomID       The ID of the clip romm.
     * @param name              The name of the clip room.
     * @param size              The dimensions of the clipping room
     * @param transformation    The transformation of the clipping room
     * @param disabled          The room's disabled status.
     * @param invisible         The room's visibility.
     */
    constructor(clipRoomID: number, name?: string, size?: Float32Array | Array<number>, transformation?: Float32Array | Array<number>, disabled?: boolean, invisible?: boolean);
}
/**
 * CLIPPING_ROOM_CHANGED
 * @event: CLIPPING_ROOM_CHANGED
 */
export class ClippingRoomChangedEvent extends WebVisEvent {
    clipRoomID: number;
    name?: string;
    size?: Float32Array | Array<number>;
    transformation?: Float32Array | Array<number>;
    disabled?: boolean;
    invisible?: boolean;
    /**
     * The CLIPPING_ROOM_CHANGED event occurs if a clip plane is changed.
     * @param clipRoomID       The ID of the clip plane.
     * @param name              The name of the clip plane.
     * @param size              The dimensions of the clipping room
     * @param transformation    The transformation of the clipping room
     * @param disabled          The clipping room is disabled
     * @param invisible         The room's visibility.
     */
    constructor(clipRoomID: number, name?: string, size?: Float32Array | Array<number>, transformation?: Float32Array | Array<number>, disabled?: boolean, invisible?: boolean);
}
/**
 * CLIPPING_ROOM_CREATED
 * @event: CLIPPING_ROOM_REMOVED
 */
export class ClippingRoomRemovedEvent extends WebVisEvent {
    clipRoomID: number;
    /**
     * The CLIPPING_ROOM_REMOVED event occurs if a clip plane is created.
     */
    constructor(clipRoomID: number);
}
/**
 * SETTING_CHANGED
 * @event: SETTING_CHANGED
 */
export class SettingChangedEvent extends WebVisEvent {
    setting: string;
    newSetting?: boolean;
    /**
     * The SETTINGS_CHANGED event occurs if one of the settings is changed.
     * @param setting       The name of the setting that has changed.
     * @param newSetting    A flag whether the setting was just created.
     */
    constructor(setting: string, newSetting?: boolean);
}
/**
 * VIEWER_SETTING_CHANGED
 * @event: VIEWER_SETTING_CHANGED
 */
export class ViewerSettingChangedEvent extends WebVisEvent {
    viewerSetting: string;
    value: any;
    viewer: ViewerAPI;
    /**
     * The VIEWER_SETTING_CHANGED event occurs if one of the settings is changed.
     * @param viewerSetting  The name of the setting that has changed.
     * @param value          The new value of the setting.
     * @param viewer         The viewer on which the setting was changed.
     */
    constructor(viewerSetting: string, value: any, viewer: ViewerAPI);
}
/**
 * SELECTION_CHANGED
 * @event: SELECTION_CHANGED
 */
export class SelectionChangedEvent extends WebVisEvent {
    targetNodeID: number;
    oldSelectionCount: number;
    newSelectionCount: number;
    selectedNodes: Array<number>;
    constructor(targetNodeID: number, oldSelectionCount: number, newSelectionCount: number, selectedNodes: Array<number>);
}
/**
 * EXPLOSION_STARTED
 * @event: EXPLOSION_STARTED
 */
export class ExplosionStartedEvent extends WebVisEvent {
    center: Float32Array;
    constructor(center: Float32Array);
}
/**
 * EXPLOSION_CHANGED
 * @event: EXPLOSION_CHANGED
 */
export class ExplosionChangedEvent extends WebVisEvent {
    explosionFactor: number;
    constructor(explosionFactor: number);
}
/**
 * EXPLOSION_FINISHED
 * @event: EXPLOSION_FINISHED
 */
export class ExplosionFinishedEvent extends WebVisEvent {
    constructor();
}
/**
 * PROGRESS_CHANGED
 * @event: PROGRESS_CHANGED
 */
export class ProgressChangedEvent extends WebVisEvent {
    progressState: IProgressState;
    constructor(progressState: IProgressState);
}
/**
 * VIEWER_CREATED
 * @event: VIEWER_CREATED
 */
export class ViewerCreatedEvent extends WebVisEvent {
    viewerId: string;
    constructor(viewerId: string);
}
/**
 * VIEWER_NAVIGATION_STARTED
 * @event: VIEWER_NAVIGATION_STARTED
 */
export class ViewerNavigationStartedEvent extends WebVisEvent {
    viewerId: string;
    constructor(viewerId: string);
}
/**
 * VIEWER_NAVIGATION_ENDED
 * @event: VIEWER_NAVIGATION_ENDED
 */
export class ViewerNavigationEndedEvent extends WebVisEvent {
    viewerId: string;
    constructor(viewerId: string);
}
/**
 * VIEWER_REMOVED
 * @event: VIEWER_REMOVED
 */
export class ViewerRemovedEvent extends WebVisEvent {
    viewerId: string;
    constructor(viewerId: string);
}
/**
 * WEBVIS_RESET
 * @event: WEBVIS_RESET
 */
export class WebVisResetEvent extends WebVisEvent {
    hard: boolean;
    constructor(hard: boolean);
}
/**
 * TRANSCODER_COMMMAND_REQUESTED
 * @event: TRANSCODER_COMMMAND_REQUESTED
 */
export class WebVisTranscoderCommandRequestEvent extends WebVisEvent {
    command: ITranscoderCommandRequest;
    constructor(command: ITranscoderCommandRequest);
}
/**
 * WEBVIS_READY
 * @event: WEBVIS_READY
 */
export class WebVisReadyEvent extends WebVisEvent {
    /**
     * The WEBVIS_READY event occurs if the WebVIS instance is ready to use.
     */
    constructor();
}
/**
 * SNAPSHOT_CREATED
 * @event: SNAPSHOT_CREATED
 */
export class SnapshotCreationStartedEvent extends WebVisEvent {
    /**
     * The SNAPSHOT_CREATION_STARTED event occurs at the beginning of a snapshot creation.
     */
    constructor();
}
/**
 * SNAPSHOT_CREATED
 * @event: SNAPSHOT_CREATED
 */
export class SnapshotCreatedEvent extends WebVisEvent {
    snapshotID: number;
    name?: string;
    attachmentID?: number;
    /**
     * The SNAPSHOT_CREATED event occurs if a snapshot is created.
     * @param {number} snapshotID The ID of the snapshot.
     * @param {string} name
     * @param {number} attachmentID
     */
    constructor(snapshotID: number, name?: string, attachmentID?: number);
}
/**
 * INTERNAL_SNAPSHOT_CREATED
 * @event: INTERNAL_SNAPSHOT_CREATED
 */
export class InternalSnapshotCreatedEvent extends WebVisEvent {
    snapshotID: number;
    name?: string;
    attachmentID?: number;
    cameraStore?: {
        viewMatrix: number[];
        centerOfRotation: number[];
        viewPointDiameter: number;
        viewPlaneDistance: number;
        cameraType: number;
    };
    snapshotStore?: any;
    propertyKeys?: Array<string>;
    instanceStores?: {
        [key: number]: any;
    };
    sessionSyncData?: SessionSyncDataMap;
    /**
     * The INTERNAL_SNAPSHOT_CREATED event occurs if a snapshot is created.
     * @param {number} snapshotID The ID of the snapshot.
     * @param {string} name
     * @param {number} attachmentID
     * @param {Object} cameraStore
     * @param {SnapshotStore} snapshotStore (only for navis)
     * @param {string[]} propertyKeys (only for navis)
     * @param {[key:number]:any} instanceStores (only for navis)
     * @param {SessionSyncDataMap} sessionSyncData (only for navis)
     */
    constructor(snapshotID: number, name?: string, attachmentID?: number, cameraStore?: {
        viewMatrix: number[];
        centerOfRotation: number[];
        viewPointDiameter: number;
        viewPlaneDistance: number;
        cameraType: number;
    }, snapshotStore?: any, propertyKeys?: Array<string>, instanceStores?: {
        [key: number]: any;
    }, sessionSyncData?: SessionSyncDataMap);
}
/**
 * SNAPSHOT_RESTORED
 * @event: SNAPSHOT_RESTORED
 */
export class SnapshotRestoredEvent extends WebVisEvent {
    snapshotID: number;
    settings: SnapshotContentSelection;
    /**
     * The SNAPSHOT_RESTORED event occurs if a snapshot is restored.
     * @param snapshotID        The ID of the snapshot.
     */
    constructor(snapshotID: number, settings: SnapshotContentSelection);
}
/**
 * SNAPSHOT_RESTORE_STARTED
 * @event: SNAPSHOT_RESTORE_STARTED
 */
export class SnapshotRestoreStartedEvent extends WebVisEvent {
    snapshotID: number;
    /**
     * The SNAPSHOT_RESTORE_STARTED event occurs if a snapshot is triggered to be restored.
     * @param snapshotID        The ID of the snapshot.
     */
    constructor(snapshotID: number);
}
/**
 * SNAPSHOT_REMOVED
 * @event: SNAPSHOT_REMOVED
 */
export class SnapshotRemovedEvent extends WebVisEvent {
    snapshotID: number;
    /**
     * The SNAPSHOT_REMOVED event occurs if a snapshot is removed.
     * @param snapshotID        The ID of the snapshot.
     */
    constructor(snapshotID: number);
}
/**
 * SNAPSHOT_CHANGED
 * @event: SNAPSHOT_CHANGED
 */
export class SnapshotChangedEvent extends WebVisEvent {
    snapshotID: number;
    text?: string;
    screenshot?: string;
    /**
     * The SNAPSHOT_CHANGED event occurs if a snapshot is changed.
     * @param snapshotID        The ID of the snapshot.
     * @param text              The ID of the snapshot.
     * @param screenshot        The screenshot of the snapshot as a dataURL
     */
    constructor(snapshotID: number, text?: string, screenshot?: string);
}
/**
 * MEASUREMENT_CREATED
 * @event: MEASUREMENT_CREATED
 */
export class MeasurementCreatedEvent extends WebVisEvent {
    measurementID: number;
    progress: MeasurementProgress;
    name?: string;
    anchorPosition?: Float32Array;
    labelPosition?: Float32Array;
    measurementData?: IMeasurementData;
    /**
     * The MEASUREMENT_CREATED event occurs if a measurement is created.
     * @param measurementID     The ID of the measurement.
     * @param progress          The progress of the measurement.
     * @param name              The name of the measurement.
     * @param anchorPosition    Anchor position in world space coordinates.
     * @param labelPosition     Label position in world space coordinates.
     * @param measurementData   The whole measurement data
     */
    constructor(measurementID: number, progress: MeasurementProgress, name?: string, anchorPosition?: Float32Array, labelPosition?: Float32Array, measurementData?: IMeasurementData);
}
/**
 * MEASUREMENT_CHANGED
 * @event: MEASUREMENT_CHANGED
 */
export class MeasurementChangedEvent extends WebVisEvent {
    measurementID: number;
    progress: MeasurementProgress;
    visible?: boolean;
    name?: string;
    /**
     * The MEASUREMENT_CHANGED event occurs if a measurement is changed.
     * @param measurementID     The ID of the measurement.
     * @param progress          The current progress of the measurement.
     * @param visible           Sets the measurement visibility on the UI.
     * @param name              The name of the measurement
     */
    constructor(measurementID: number, progress: MeasurementProgress, visible?: boolean, name?: string);
}
/**
 * MEASUREMENT_REMOVED
 * @event: MEASUREMENT_REMOVED
 */
export class MeasurementRemovedEvent extends WebVisEvent {
    measurementID: number;
    /**
     * The MEASUREMENT_REMOVED event occurs if a measurement is removed.
     * @param measurementID     The ID of the measurement.
     */
    constructor(measurementID: number);
}
/**
 * ANNOTATION_CREATED
 * @event: ANNOTATION_CREATED
 */
export class AnnotationCreatedEvent extends WebVisEvent {
    annotationID: number;
    label: string;
    visible: boolean;
    anchorPosition: Float32Array | Array<number>;
    labelPosition: Float32Array | Array<number>;
    explicitOffset: boolean;
    transform?: Float32Array | Array<number>;
    trustedSource?: boolean;
    nodeID?: number;
    /**
     * The ANNOTATION_CREATED event occurs if a annotation is created.
     * @param annotationID        The ID of the annotation.
     * @param label               Text to show on the annotation.
     * @param visible             Indicates if the annotation should be visible or hidden.
     * @param anchorPosition      Anchor position in world space coordinates.
     * @param labelPosition       Label position in world space coordinates.
     * @param explicitOffset      Label offset was explicitly defined
     * @param transform           The local transform matrix of the annotation
     * @param trustedSource       Specifies if the annotation content comes from a trusted source.
     * @param nodeID              Specifies the ID of the Node where the annotation is attached to.
     */
    constructor(annotationID: number, label: string, visible: boolean, anchorPosition: Float32Array | Array<number>, labelPosition: Float32Array | Array<number>, explicitOffset: boolean, transform?: Float32Array | Array<number>, trustedSource?: boolean, nodeID?: number);
}
/**
 * ANNOTATION_REMOVED
 * @event: ANNOTATION_REMOVED
 */
export class AnnotationRemovedEvent extends WebVisEvent {
    annotationID: number;
    /**
     * The ANNOTATION_REMOVED event occurs if a annotation is removed.
     * @param annotationID        The ID of the annotation.
     */
    constructor(annotationID: number);
}
/**
 * ACTIVE_SCENE_VOLUME_CHANGED
 * @event: ACTIVE_SCENE_VOLUME_CHANGED
 */
export class ActiveSceneVolumeChangedEvent extends WebVisEvent {
    volume: BoxVolume;
    /**
     * The ACTIVE_SCENE_VOLUME_CHANGED event occurs if the active scene volume changes.
     * @param volume        The new active scene volume
     */
    constructor(volume: BoxVolume);
}
/**
 * ANNOTATION_CHANGED
 * @event: ANNOTATION_CHANGED
 */
export class AnnotationChangedEvent extends WebVisEvent {
    annotationID: number;
    label?: string | undefined;
    visible?: boolean | undefined;
    anchorPosition?: Float32Array | Array<number> | undefined;
    labelPosition?: Float32Array | Array<number> | undefined;
    active?: boolean | undefined;
    transform?: Float32Array | Array<number> | undefined;
    trustedSource?: boolean;
    /**
     * The ANNOTATION_CHANGED event occurs if a annotation is changed.
     * @param annotationID        The ID of the annotation.
     * @param label               Text to show on the annotation.
     * @param visible             Indicates if the annotation should be visible or hidden.
     * @param anchorPosition      Anchor position in world space coordinates.
     * @param labelPosition       Label position in world space coordinates.
     * @param active              Indicates if the annotation is active or not.
     * @param transform           Annotation transform
     * @param trustedSource       Specifies if the annotation content comes from a trusted source.
     */
    constructor(annotationID: number, label?: string | undefined, visible?: boolean | undefined, anchorPosition?: Float32Array | Array<number> | undefined, labelPosition?: Float32Array | Array<number> | undefined, active?: boolean | undefined, transform?: Float32Array | Array<number> | undefined, trustedSource?: boolean);
}
/**
 * NOTIFICATION
 * @event: NOTIFICATION
 */
export class NotificationEvent extends WebVisEvent {
    message: string;
    notificationLevel: string;
    /**
     * The NOTIFICATION event occurs if a new notification arrives.
     * @param message               The notification message.
     * @param notificationLevel      The level of the notification.
     */
    constructor(message: string, notificationLevel: string);
}
/**
 * MODEL_RENDERED
 * @event: MODEL_RENDERED
 */
export class ModelRenderedEvent extends WebVisEvent {
    /**
     * The MODEL_RENDERED event occurs if model is rendered.
     */
    constructor();
}
/**
 * LAYERFILTER_CHANGED
 * @event: LAYERFILTER_CHANGED
 */
export class LayerFilterChangedEvent extends WebVisEvent {
    name: string;
    enabled: boolean;
    /**
     * The LAYERFILTER_CHANGED event occurs if a layer filter is changed.
     * @param name        The name of the changed layerfilter
     * @param enabled     The new enabled state of the changed layerfilter
     */
    constructor(name: string, enabled: boolean);
}
/**
 * LAYERFILTER_REGISTERED
 * @event: LAYERFILTER_REGISTERED
 */
export class LayerFilterRegisteredEvent extends WebVisEvent {
    name: string;
    enabled: boolean;
    /**
     * The LAYERFILTER_REGISTERED event occurs if a new layer filter is registered.
     * @param name {string} The name of the registered Layerfilter.
     * @parame enabled The enabled state of the new layer filter
     */
    constructor(name: string, enabled: boolean);
}
/**
 * LAYERFILTER_UNREGISTERED
 * @event: LAYERFILTER_UNREGISTERED
 */
export class LayerFilterUnregisteredEvent extends WebVisEvent {
    name: string;
    /**
     * The LAYERFILTER_UNREGISTERED event occurs if a layer filter is unregistered.
     * @param name {string} The name of the registered Layerfilter.
     */
    constructor(name: string);
}
export interface CustomIconEntry {
    property: string;
    value: any;
    icon: string;
    sortIdx: number;
}
/**
 * CUSTOM_TREE_ICON_CLICKED
 * @event: CUSTOM_TREE_ICON_CLICKED
 */
export class CustomTreeIconClickedEvent extends WebVisEvent {
    nodeID: number;
    entry: CustomIconEntry;
    constructor(nodeID: number, entry: CustomIconEntry);
}
/**
 * ACTIVE_ITEM
 * @event: ACTIVE_ITEM
 */
export class ActiveItemEvent extends WebVisEvent {
    itemID: number;
    itemType: string;
    viewer: ViewerAPI;
    /**
     * The ACTIVE_ITEM event indicates a change to the current active item.
     * The item can be a node, clipplane, etc
     * @param itemID        The ID of the item
     * @param itemType      See enum WebVisItemType
     * @param viewer        The viewer the has the active item
     */
    constructor(itemID: number, itemType: string, viewer: ViewerAPI);
}
/**
 * UPDATESTATE_ERROR
 * @event: UPDATESTATE_ERROR
 */
export class UpdateStateErrorEvent extends WebVisEvent {
    cacheUri: string;
    errorCode: number;
    /**
     * The UPDATESTATE_ERROR event indicates a remote error
     * @param cacheUri       The cacheURI where the error occured
     * @param errorCode      The error code
     */
    constructor(cacheUri: string, errorCode: number);
}
/**
 * JOBADD_ERROR
 * @event: JOBADD_ERROR
 */
export class JobAddErrorEvent extends WebVisEvent {
    cacheUri: string;
    errorCode: number;
    /**
     * The UPDATESTATE_ERROR event indicates a remote error
     * @param cacheUri       The cacheURI where the error occured
     * @param errorCode      The error code
     */
    constructor(cacheUri: string, errorCode: number);
}
/**
 * UPDATESTATE_COUNT
 * @event: UPDATESTATE_COUNT
 */
export class UpdateStateCountEvent extends WebVisEvent {
    count: number;
    /**
     * The UPDATESTATE_COUNT event indicates the current count of the remaining remot updatestates
     * @param count       The current count of the remaining updatestates
     */
    constructor(count: number);
}
/**
 * DOWNLOAD_COUNT
 * @event: DOWNLOAD_COUNT
 */
export class DownloadCountEvent extends WebVisEvent {
    pending: number;
    /**
     * The DOWNLOAD_COUNT event indicates the current count of pending remote downloads
     * @param pending       The current count of pending remote downloads
     */
    constructor(pending: number);
}
/**
 * SESSION_STATE_CHANGED
 * @event: SESSION_STATE_CHANGED
 */
export class SessionStateChangedEvent extends WebVisEvent {
    sessionStateData: ISessionStateData;
    constructor(sessionStateData: ISessionStateData);
}
/**
 * STREAM_STATE_CHANGED
 * @event: STREAM_STATE_CHANGED
 */
export class StreamStateChangedEvent extends WebVisEvent {
    streamStateData: IStreamStateData;
    constructor(streamStateData: IStreamStateData);
}
/**
 * MEMBER_JOINED
 * @event: MEMBER_JOINED
 */
export class MemberJoinedEvent extends WebVisEvent {
    memberData: ISessionMemberData;
    constructor(memberData: ISessionMemberData);
}
/**
 * MEMBER_UPDATED
 * @event: MEMBER_UPDATED
 */
export class MemberUpdatedEvent extends WebVisEvent {
    memberData: ISessionMemberData;
    constructor(memberData: ISessionMemberData);
}
/**
 * MEMBER_LEFT
 * @event: MEMBER_LEFT
 */
export class MemberLeftEvent extends WebVisEvent {
    memberID: number;
    constructor(memberID: number);
}
/**
 * STATE_SYNC
 * @event: STATE_SYNC
 */
export class StateSyncEvent extends WebVisEvent {
    isEmpty: boolean;
    sessionStore?: ISessionStore;
    sessionSyncData?: SessionSyncData | SessionSyncDataMap;
    /***
     * The STATE_SYNC event is fired to sync new members of a session.
     * @param isEmpty {boolean} Hints that the state is empty. Depending on this the client might want to replace the session state with its own.
     * @param sessionStore {ISessionStore} The SessionStore we have to load if the state is not empty.
     * @param sessionSyncData {SessionSyncData | SessionSyncDataMap} Additional data we need for synchronisation.
     */
    constructor(isEmpty: boolean, sessionStore?: ISessionStore, sessionSyncData?: SessionSyncData | SessionSyncDataMap);
}
/**
 * SESSION_PARAMETER_CHANGED
 * @event: SESSION_PARAMETER_CHANGED
 */
export class SessionParameterChangedEvent extends WebVisEvent {
    sessionParameter: string;
    memberID?: number;
    available?: boolean;
    interest?: boolean;
    /***
     * The SESSION_PARAMETER_CHANGED event is fired when a session parameter is changed.
     * @param {string} sessionParameter The key of the changed session parameter.
     * @param {number} memberID The (optional) memberID for which a member session parameter was changed.
     */
    constructor(sessionParameter: string, memberID?: number, available?: boolean, interest?: boolean);
}
/**
 * SCENARIO_LOADED
 * @event: SCENARIO_LOADED
 */
export class ScenarioLoadedEvent extends WebVisEvent {
    scenario: string;
    role?: string;
    directive?: string;
    directiveScript?: string;
    /***
     * The SCENARIO_LOADED event is fired when a scenario is loaded.
     * @param {string} scenario The identifier for the scenario
     * @param {string} role The role that was assigned for the scenario
     * @param {string} directive The id of the directive to execute
     * @param {string} directiveScript The script to execute
     */
    constructor(scenario: string, role?: string, directive?: string, directiveScript?: string);
}
export type RenderSetupRequestCallback = (renderSetup: string) => void;
/**
 * RENDER_SETUP_REQUEST
 * @event: RENDER_SETUP_REQUEST
 */
export class RenderSetupRequestEvent extends WebVisEvent {
    viewer: ViewerAPI;
    callback: RenderSetupRequestCallback;
    constructor(viewer: ViewerAPI, callback: RenderSetupRequestCallback);
}
/**
 * INTERACTION_MODE_CHANGED
 * @event: INTERACTION_MODE_CHANGED
 */
export class InteractionModeChangedEvent extends WebVisEvent {
    mode: string;
    subMode: string;
    /**
     * This event signals that the interaction state has change
     */
    constructor(mode: string, subMode: string);
}
/**
 * CUSTOM_UI_REQUEST
 * @event: CUSTOM_UI_REQUEST
 */
export class CustomUIRequestEvent extends WebVisEvent {
    content: string;
    responseTarget: string;
    control?: any;
    /**
     * This event signals a custom UI dialog
     */
    constructor(content: string, responseTarget: string, control?: any);
}
/**
 * CREDENTIALS_AQUISITION_UPDATE
 * @event: CREDENTIALS_AQUISITION_UPDATE
 */
export class CredentialsAquisitionUpdateEvent extends WebVisEvent {
    accepted: boolean;
    credentials: string;
    /**
     * This event signals new or failed credentials aquisition
     * @param {string} accepted Is true when credentials were found
     * @param {string} credentials The credentials data
     */
    constructor(accepted: boolean, credentials: string);
}
/**
 * SERVICE_REQUEST
 * @event: SERVICE_REQUEST
 */
export class ServiceRequestEvent extends WebVisEvent {
    serviceClass: string;
    parameters: any;
    spaceDomain?: string;
    /**
     * This event signals a request for a service
     * @param {string} serviceClass The kind of service
     * @param {string} parameters The parameters for the service
     * @param {string} spaceDomain The space domain of the request origin
     */
    constructor(serviceClass: string, parameters: any, spaceDomain?: string);
}
/**
 * SESSION_TRANSFER
 * @event: SESSION_TRANSFER
 */
export class SessionTransferEvent extends WebVisEvent {
    sessionID: string;
    /**
     * This event signals a that the session is transfering
     * @param {string} sessionID The id of the new session
     */
    constructor(sessionID: string);
}
/**
 * VIEWPORTSIZE_CHANGED
 * @event: VIEWPORTSIZE_CHANGED
 */
export class ViewportChangedEvent extends WebVisEvent {
    width: number;
    height: number;
    /**
     * This event signals a that the viewport size has changed
     * @param {number} width The new width of the viewport
     * @param {number} height The new height of the viewport
     */
    constructor(width: number, height: number);
}
/**
 * ANIMATION_FRAMES_CREATED
 * @event: ANIMATION_FRAMES_CREATED
 */
export class AnimationFramesCreatedEvent extends WebVisEvent {
    name: string;
    frames: Array<AnimationFrame>;
    /**
     * This event signals a that a new animation frames are created
     * @param {string} name The name of the generated Animation frames
     */
    constructor(name: string, frames: Array<AnimationFrame>);
}
/**
 * ANIMATION_FRAMES_REMOVED
 * @event: ANIMATION_FRAMES_REMOVED
 */
export class AnimationFramesRemovedEvent extends WebVisEvent {
    name: string;
    /**
     * This event signals a that animation frames are removed
     * @param {string} name The name of the generated Animation frames
     */
    constructor(name: string);
}
/**
 * ANIMATION_STARTED
 * @event: ANIMATION_STARTED
 */
export class AnimationStartedEvent extends WebVisEvent {
    animationName: string;
    targetNodeID: number;
    options: AnimationOptions;
    /**
     * This event signals a that an animation has started
     * @param {string} animationName The name of the started animation
     * @param {number} targetNodeID The node id which run the animation
     */
    constructor(animationName: string, targetNodeID: number, options: AnimationOptions);
}
/**
 * ANIMATION_ITERATION
 * @event: ANIMATION_ITERATION
 */
export class AnimationIterationEvent extends WebVisEvent {
    animationName: string;
    targetNodeID: number;
    iteration: number;
    /**
     * This event signals a that an animation finished a iteration
     * @param {string} animationName The name of the started animation
     * @param {number} targetNodeID The node id which run the animation
     * @param {number} iteration The current iteration
     */
    constructor(animationName: string, targetNodeID: number, iteration: number);
}
/**
 * ANIMATION_ENDED
 * @event: ANIMATION_ENDED
 */
export class AnimationEndedEvent extends WebVisEvent {
    animationName: string;
    targetNodeID: number;
    options: AnimationOptions;
    /**
     * This event signals a that an animation has ended
     * @param {string} animationName The name of the started animation
     * @param {number} targetNodeID The node id which run the animation
     */
    constructor(animationName: string, targetNodeID: number, options: AnimationOptions);
}
/**
 * CUSTOM_PROPERTY_REGISTERED
 * @event: CUSTOM_PROPERTY_REGISTERED
 */
export class CustomPropertyRegisteredEvent extends WebVisEvent {
    customPropName: string;
    recursive: boolean;
    defaultValue: any;
    /**
     * This event signals a that a custom Property was registered
     * @param {string} customPropName The name of the custom property
     * @param {boolean} recursive The recursive state of the new custom property
     * @param {any} defaultValue specifies the property default value
     */
    constructor(customPropName: string, recursive: boolean, defaultValue: any);
}
/**
 * ATTACHMENT_CREATED
 * @event: ATTACHMENT_CREATED
 */
export class AttachmentCreatedEvent extends WebVisEvent {
    attachmentID: number;
    dataType: AttachmentType;
    /**
     * This event signals a that a new attachment was created
     * @param {number} attachmentID The id of the attachment
     * @param {AttachmentType} dataType The type of the attachment data
     */
    constructor(attachmentID: number, dataType: AttachmentType);
}
/**
 * ATTACHMENT_DATA_CHANGED
 * @event: ATTACHMENT_DATA_CHANGED
 */
export class AttachmentDataChangedEvent extends WebVisEvent {
    attachmentID: number;
    data: any;
    /**
     * This event signals a that the data of an attachment was changed
     * @param {number} attachmentID The id of the attachment
     * @param {*} data The new attachment data
     */
    constructor(attachmentID: number, data: any);
}
/**
 * ATTACHMENT_REMOVED
 * @event: ATTACHMENT_REMOVED
 */
export class AttachmentRemovedEvent extends WebVisEvent {
    attachmentID: number;
    /**
     * This event signals a that an attachemnt was removed
     * @param {number} attachmentID The id of the attachment
     */
    constructor(attachmentID: number);
}
export class XRSessionStateChangedEvent extends WebVisEvent {
    state: XRSessionState;
    constructor(state: XRSessionState);
}
export class XRMemberAddedEvent extends WebVisEvent {
    xrMemberId: number;
    constructor(xrMemberId: number);
}
export class XRMemberRemovedEvent extends WebVisEvent {
    xrMemberId: number;
    constructor(xrMemberId: number);
}
export class XRMemberCapabilitiesChangedEvent extends WebVisEvent {
    xrMemberId: number;
    xrCapabilities: Array<XRCapabilities>;
    constructor(xrMemberId: number, xrCapabilities: Array<XRCapabilities>);
}
export class XRMemberStateChangedEvent extends WebVisEvent {
    xrMemberId: number;
    xrMemberState: XRMemberState;
    constructor(xrMemberId: number, xrMemberState: XRMemberState);
}
export class XRMemberModelTrackerInfoReceivedEvent extends WebVisEvent {
    xrMemberId: number;
    info: any;
    constructor(xrMemberId: number, info: any);
}
export class XRMemberModelTrackerEdgeImgReceivedEvent extends WebVisEvent {
    xrMemberId: number;
    img: any;
    constructor(xrMemberId: number, img: any);
}

export interface RegisterMemberServiceProvider {
    spaceDomain: string;
    reachability: Array<string>;
    memberID: number;
}
export type URIMap = Array<{
    regex: string;
    replace: string;
}>;

export type IRequestWrapper = {
    get: (http: any, options: {
        [key: string]: any;
    }, callback: (response: any) => void, errorCallback: (error: any) => void) => void;
    post: (http: any, options: {
        [key: string]: any;
    }, headers: Array<[string, any]>, postContent: string, callback: (response: any) => void, errorCallback: (error: any) => void) => void;
};


export enum RestFunctionName {
    ADD = "add",
    REMOVE = "remove",
    LOAD_SESSION = "loadSession",
    SET_PROPERTY = "setProperty",
    RESET_PROPERTIES = "resetProperties",
    ADD_CUSTOM_NODE = "addCustomNode",
    SET_LAYERFILTER_ENABLED = "setLayerFilterEnabled",
    CREATE_CLIPPLANE = "createClipPlane",
    CHANGE_CLIPPLANE = "changeClipPlane",
    REMOVE_CLIPPLANE = "removeClipPlane",
    CREATE_CLIPPINGROOM = "createClippingRoom",
    CHANGE_CLIPPINGROOM = "changeClippingRoom",
    REMOVE_CLIPPINGROOM = "removeClippingRoom",
    CREATE_ANNOTATION = "createAnnotation",
    CHANGE_ANNOTATION = "changeAnnotation",
    REMOVE_ANNOTATION = "removeAnnotation",
    CREATE_ATTACHMENT = "createAttachment",
    SET_ATTACHMENT_DATA = "setAttachmentData",
    REMOVE_ATTACHMENT = "removeAttachment",
    ADD_TO_SELECTION = "addToSelection",
    REMOVE_FROM_SELECTION = "removeFromSelection",
    CLEAR_SELECTION = "clearSelection",
    INVERT_SELECTION = "invertSelection",
    SET_SELECTION = "setSelection",
    CREATE_SNAPSHOT = "createSnapshot",
    CHANGE_SNAPSHOT = "changeSnapshot",
    RESTORE_SNAPSHOT = "restoreSnapshot",
    REMOVE_SNAPSHOT = "removeSnapshot",
    CREATE_MEASUREMENT = "createMeasurement",
    REMOVE_MEASUREMENT = "removeMeasurement",
    GET_L3D_INFO = "getL3DInfo",
    GET_SIMPLE_L3D_INFO = "getSimpleL3DInfo",
    JOIN_SESSION = "joinSession",
    LIST_ENDPOINTS_WS = "listEndpointsWS",
    GET_MEMBERS = "getMembers",
    GET_PUBLISHED_STREAMS = "getPublishedStreams",
    PUBLISH_STREAM = "publishStream",
    REMOVE_STREAM = "removeStream",
    SEND_STREAM_SIGNAL = "sendStreamSignal",
    CHANGE_SESSION_PARAMETER = "changeSessionParameter",
    ANSWER_MEMBER_REQUEST = "answerMemberRequest",
    ANSWER_CREDENTIALS_REQUEST = "answerCredentialsRequest",
    READ_SESSION_PARAMETER = "readSessionParameter",
    LOAD_SCENARIO = "loadScenario",
    SHUTDOWN = "shutdown",
    REMOVE_MEMBER = "removeMember",
    PROMOTE_MEMBER = "promoteMember",
    TRANSFER_SESSION = "transferSession",
    REQUEST_DERIVED_TOKEN = "requestDerivedToken",
    REGISTER_SERVICE_PROVIDER = "registerServiceProvider",
    REGISTER_CUSTOM_PROPERTY = "registerCustomProperty",
    CREATE_ANIMATION_FRAMES = "createAnimationFrames",
    REMOVE_ANIMATION_FRAMES = "removeAnimationFrames"
}
export interface JoinSessionResponseContent extends ISessionMemberData {
    memberToken: string;
    authorization?: string;
    restrictedJoin: boolean;
    restrictedAccess: boolean;
    protocolMajor: number;
    protocolMinor: number;
    protocolPatch: number;
}
export interface LoadScenarioRequestContent {
    scenario: string;
}
export interface LoadSessionRequestContent {
    sessionID?: string;
    sessionStore: ISessionStore;
}
export type PublishStreamRequestContent = ISessionStreamData;
export type RemoveStreamRequestContent = {
    streamID: number;
};
export interface ChangeSessionParameterRequestContent {
    sessionParameter: string;
    value?: any;
    memberID?: number;
    declare?: boolean;
    interest?: boolean;
}
export interface ReadSessionParameterRequestContent {
    sessionParameter?: string;
    memberID?: number;
}
export interface PublishStreamResponseContent {
    streamId: number;
    location?: string;
}
export type SendStreamSignalRequestContent = IStreamStateData;
export interface AnswerMemberRequestRequestContent {
    transactionCode: string;
    data: any;
}
export interface AnswerCredentialsRequestRequestContent {
    requesterID: number;
    providerID: number;
    accept: boolean;
}



export interface AddRequestContent {
    parentId: number;
    dataUri: string;
    label?: string;
    initialProperties?: {
        [key: string]: any;
    };
    mimeType?: string;
    usage?: string;
}
export interface AddResponseContent {
    nodeId: number;
    transactionId: number;
}
export interface AddCustomNodeRequestContent {
    customType: string;
    attachmentId: number;
}
export interface AddCustomNodeResponseContent {
    nodeId: number;
    transactionId: number;
}
export interface RemoveRequestContent {
    nodeId: Array<number>;
}
export interface RemoveResponseContent {
    transactionId: number;
}
export interface SetPropertyRequestContent {
    nodeId: Array<number>;
    property: string;
    value: any;
    recursive?: boolean;
}
export interface SetPropertyResponseContent {
    transactionId: number;
}
export interface ResetPropertiesRequestContent {
    nodeId: number;
    properties: Array<string>;
}
export interface ResetPropertiesResponseContent {
    transactionId: number;
}
export interface SetEnabledLayersRequestContent {
    name: string;
    enabled: boolean;
}
export interface SetEnabledLayersResponseContent {
    transactionId: number;
}
export interface CreateClipPlaneRequestContent {
    position: [number, number, number];
    normal: [number, number, number];
    name: string;
    thickness: number;
    tangent: [number, number, number];
    disabled: boolean;
    invisible: boolean;
    exclusive: boolean;
}
export interface CreateClipPlaneResponseContent {
    clipPlaneId: number;
    transactionId: number;
}
export interface ChangeClipPlaneRequestContent {
    clipPlaneId: number;
    position: [number, number, number];
    normal: [number, number, number];
    name: string;
    thickness: number;
    tangent: [number, number, number];
    disabled: boolean;
    invisible: boolean;
    exclusive: boolean;
}
export interface ChangeClipPlaneResponseContent {
    transactionId: number;
}
export interface RemoveClipPlaneRequestContent {
    clipPlaneId: number;
}
export interface RemoveClipPlaneResponseContent {
    transactionId: number;
}
export interface CreateClippingRoomRequestContent {
    size: [number, number, number];
    transformation: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
    name: string;
    disabled: boolean;
    invisible: boolean;
}
export interface CreateClippingRoomResponseContent {
    clipRoomId: number;
    transactionId: number;
}
export interface ChangeClippingRoomRequestContent {
    clipRoomId: number;
    size: [number, number, number];
    transformation: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
    name: string;
    disabled: boolean;
    invisible: boolean;
}
export interface ChangeClippingRoomResponseContent {
    transactionId: number;
}
export interface RemoveClippingRoomRequestContent {
    clipRoomId: number;
}
export interface RemoveClippingRoomResponseContent {
    transactionId: number;
}
export interface CreateAnnotationRequestContent {
    nodeID: number;
    label: string;
    visible: boolean;
    anchorPosition: [number, number, number];
    labelOffset: [number, number, number];
}
export interface CreateAnnotationResponseContent {
    annotationId: number;
    transactionId: number;
}
export interface ChangeAnnotationRequestContent {
    annotationId: number;
    label: string;
    visible: boolean;
    anchorPosition: [number, number, number];
    labelOffset: [number, number, number];
    active: boolean;
    transform: Array<number>;
}
export interface ChangeAnnotationResponseContent {
    transactionId: number;
}
export interface RemoveAnnotationRequestContent {
    annotationId: number;
}
export interface RemoveAnnotationResponseContent {
    transactionId: number;
}
export interface CreateMeasurementRequestContent {
    measurementData: any;
}
export interface CreateMeasurementResponseContent {
    measurementId: number;
    transactionId: number;
}
export interface RemoveMeasurementRequestContent {
    measurementId: number;
}
export interface RemoveMeasurementResponseContent {
    measurementId: number;
    transactionId: number;
}
export interface CreateSnapshotRequestContent {
    name: string;
    attachmentID: number;
    cameraStore: {
        viewMatrix: number[];
        centerOfRotation: number[];
        viewPointDiameter: number;
        viewPlaneDistance: number;
        cameraType: number;
    };
}
export interface CreateSnapshotResponseContent {
    snapshotId: number;
    transactionId: number;
}
export interface ChangeSnapshotRequestContent {
    snapshotId: number;
    name?: string;
    screenshotURL?: string;
}
export interface ChangeSnapshotResponseContent {
    transactionId: number;
}
export interface RestoreSnapshotRequestContent {
    snapshotId: number;
    settings: SnapshotContentSelection;
}
export interface RestoreSnapshotResponseContent {
    transactionId: number;
}
export interface RemoveSnapshotRequestContent {
    snapshotId: number;
}
export interface RemoveSnapshotResponseContent {
    snapshotId: number;
    transactionId: number;
}
export interface RemoveMemberRequestContent {
    memberID: number;
}
export interface PromoteMemberRequestContent {
    memberID: number;
}
export interface AddToSelectionRequestContent {
    nodeID: Array<number>;
}
export interface AddToSelectionResponseContent {
    transactionId: number;
}
export interface RemoveFromSelectionRequestContent {
    nodeID: Array<number>;
}
export interface RemoveFromSelectionResponseContent {
    transactionId: number;
}
export interface SetSelectionRequestContent {
    nodeID: Array<number>;
}
export interface SetSelectionResponseContent {
    transactionId: number;
}
export interface ClearSelectionResponseContent {
    transactionId: number;
}
export interface InvertSelectionResponseContent {
    transactionId: number;
}
export interface GetL3DInfoRequestContent {
    nodeId?: number;
    objectId?: number;
    instanceId?: number;
    nodeIds?: Array<number>;
    objectIds?: Array<number>;
    instanceIds?: Array<number>;
    recursive?: boolean;
}
export interface GetL3DInfoResponseContent {
    l3dInstanceId: number;
    l3dInstances: Array<L3DInstanceData>;
    l3dStores: Array<L3DStoreData>;
    nodeId: number;
    transactionId?: number;
}
export type SimpleL3DInfo = {
    path: number[];
    remoteID: number;
    remoteIDOffset: number;
    remoteShapeIDOffset: number;
    remoteNodeCount: number;
    remoteShapeCount: number;
};
export type GetSimpleL3DInfoRequestContent = {
    nodeIDs?: number[];
    pathes?: number[][];
    shapeIDs?: number[];
};
export type GetSimpleL3DInfoResponseContent = SimpleL3DInfo[] | [];
export interface RegisterCustomPropertyRequestContent {
    name: string;
    recursive: boolean;
    defaultValue: any;
}
export interface RegisterCustomPropertyResponseContent {
    transactionId: number;
}
export interface CreateAnimationFramesRequestContent {
    name: string;
    frames: Array<AnimationFrame>;
}
export interface CreateAnimationFramesResponseContent {
    transactionId: number;
}
export interface RemoveAnimationFramesRequestContent {
    name: string;
}
export interface RemoveAnimationFramesResponseContent {
    transactionId: number;
}
export interface CreateAttachmentRequestContent {
    type: string;
}
export interface CreateAttachmentResponseContent {
    attachmentId: number;
    transactionId: number;
}
export interface SetAttachmentDataRequestContent {
    attachmentId: number;
    attachmentData: any;
}
export interface SetAttachmentDataResponseContent {
    transactionId: number;
}
export interface RemoveAttachmentRequestContent {
    attachmentId: number;
}
export interface RemoveAttachmentResponseContent {
    transactionId: number;
}
export interface GetL3DInfoForObjectIDRequestContent {
    objectId: number;
    recursive: boolean;
}
export type GetL3DInfoForObjectIDResponseContent = GetL3DInfoResponseContent;
export interface L3DStoreData {
    cacheURI: string;
    originalURI: string;
    l3dStoreID: number;
    l3dSnippet: IndexL3DPropertyData;
}
export interface TransferSessionRequestContent {
    sessionID: string;
}


export interface ActiveItemInfo {
    type: NodeType;
    id: number;
}

export type AnimationFrame = {
    center?: Float32Array;
    color?: Float32Array;
    rotation?: Float32Array;
    scale?: Float32Array;
    translation?: Float32Array;
    opacity?: number;
    time?: number;
    enabled?: boolean;
};



export type AnimationOptions = {
    duration?: number;
    delay?: number;
    timingFunction?: AnimationTimingFunction;
    iterationCount?: number;
    playbackRate?: number;
    time?: number;
    transformOrigin?: any;
    playState?: AnimationPlayState;
};

/**
 * The BoxVolume is a webVis type used for representing a Box Bounding Volume.
 * It supports basic operations for manipulating the volume.
 *
 * @example
 * <code><br /><br /> //create a new box volume
 * <br /> const bv = webvis.createBoxVolume();
 * <br />
 * <br /> //set its boundaries
 * <br /> bv.setMin(new Float32Array([-10,-10,-10]));
 * <br /> bv.setMax(new Float32Array([10,10,10]));
 * <br />
 * <br /> //set this as the local volume for the node with ID 8
 * <br /> webvis.setProperty(8, 'localVolume', bv);  </code>
 *
 */
export interface BoxVolume {
    isValid(): boolean;
    setValid(valid?: boolean): void;
    fromArray(array: Float32Array | Array<number>): boolean;
    isValid(): boolean;
    reset(): void;
    setFromCenterSize(center: Float32Array, size: Float32Array): BoxVolume;
    setMin(min: Float32Array): void;
    setMax(max: Float32Array): void;
    includePoint(p: Float32Array): void;
    extend(newMin: Float32Array, newMax: Float32Array): void;
    extendByVolume(other: BoxVolume): void;
    extendByTransformedVolume(other: BoxVolume, transform?: Float32Array): void;
    getMin(): Float32Array;
    getMax(): Float32Array;
    getCenter(): Float32Array;
    getSize(): Float32Array;
    getRadialVec(): Float32Array;
    getDiameter(): number;
    copy(other: BoxVolume): void;
    transformFrom(matrix: Float32Array, other: BoxVolume): BoxVolume;
    transformFromArray(matrix: Float32Array, otherVolume: number[]): BoxVolume;
    overlaps(other: BoxVolume): boolean;
    contains(other: BoxVolume): boolean;
    getQuantizedSubVolume(quantFacMin: {
        [id: number]: number;
    }, quantFacMax: {
        [id: number]: number;
    }): BoxVolume;
    equals(other: BoxVolume): boolean;
    getCornerPoints(): Array<Float32Array>;
}

export interface ChangeSelectionResult {
    targetNodeID: number;
    oldSelectionCount: number;
    newSelectionCount: number;
    selectedNodes: Array<number>;
}

/**
 * @hidden
 */
export type MetaDataJSON = {
    [key: string]: any;
};
/**
 * @hidden
 */
export type StatisticsJSON = Array<{
    [key: string]: any;
}>;
/**
 * @hidden
 */
export type ComparisonJSON = Array<{
    [key: string]: any;
}>;
/**
 * @hidden
 */
export type QueryResultJSON = Array<{
    [key: string]: any;
}>;




export interface SyncEvent<T> {
    type: string;
    id?: string;
    content: T;
    binaryPayload?: string;
    flags?: any;
}
export interface SyncEventSubscribeData {
    id: string;
    sig: string;
}
export interface ResourceDescriptor<D> {
    id: string;
    state: any;
    type: ResourceName;
    create: string;
    expire: string;
    descriptor: D;
    access: ResourceAccessor;
}
export type AccessProtocol = "ws" | "http";
export type ResourceIdentifier = {
    resourceID: string;
    signature: string;
};
export type ResourceEndpoint = {
    name: string;
    port: number;
    basePath: string;
    protocol: AccessProtocol;
};
export type ResourceAccessor = {
    clusterId: string;
    targetId?: string;
    ip?: string;
    endpoints?: Array<ResourceEndpoint>;
    signature: string;
};
export type EndpointURIMap = {
    [key: string]: string;
};
export type ResourceUpdate<T> = {
    resource: ResourceDescriptor<T>;
    endpointURLs: EndpointURIMap;
};
export type Content = IndexL3D;
export type Delivery = {};
export interface ResourceRequest<T> {
    ServiceClass: string;
    spaceDomain?: string;
    metadata?: string;
    Parameters?: T;
}

export interface IProgressState {
    numberOfUploads: number;
    numberOfDownloads: number;
    numberOfUpdateStates: number;
    downloadProgress: number;
    renderingProgress: number;
    isProcessing: boolean;
}






export interface ErrorJSONEntry {
    code: number;
    messages: Array<string>;
    name: string;
}
export type ErrorJSON = Array<ErrorJSONEntry>;
export interface ErrorInfo {
    messages?: Array<string>;
    code?: number;
    state?: L3DResourceClientState;
}
export interface PageDescVec {
    pageDescVec: Array<PageDesc>;
}
export interface PageDesc {
    resourceRef: string;
    backMap: Array<number>;
    priority: Array<number>;
    volume: Array<number>;
}
export interface IndexL3DSourceData {
    uri: Array<string>;
    url: string;
    authUrl: string;
    mimeType: string;
    eTag: number;
    property: Array<string>;
    bytes: number;
}
export interface IndexL3DCacheData {
    eTag: number;
    url: string;
    representations: Array<string>;
    validUntil: number;
    state: string;
    bytes: number;
}
export interface IndexL3DStatisticsData {
    createDate: number;
    updateDate: number;
    lastReadDate: number;
    queuedDate: number;
    processingStartDate: number;
    processingEndDate: number;
    numReads: number;
    bytesRead: number;
}
export enum IndexL3DVolumeType {
    none = 0,
    pages = 1,
    proxy = 2
}
export type IndexL3DLayerFilter = {
    volume: Array<number>;
    layers: Array<number>;
    boxVolume: BoxVolume;
};
export interface IndexL3DPropertyData {
    auxStructure: number;
    nodesPerFile: number;
    auxVolumeType: string;
    auxVolumes: Array<Array<number>>;
    numAuxPages: number;
    numAuxPageContainers: number;
    numAuxPagesPerContainer: any;
    defaultEnabledAuxNodeId: number;
    numActivatableAuxNodes: number;
    numModelviews: number;
    numInternalLayerFilters: number;
    defaultLayerFilter: string;
    layerFilters: {
        [key: string]: IndexL3DLayerFilter;
    };
    geoVolumeType: string;
    geoVolumes: Array<Array<number>>;
    geoLayers: Array<Array<number>>;
    geoPixelContribs: Array<Array<number>>;
    numGeoPages: number;
    numGeoPageContainers: number;
    numGeoPagesPerContainer: any;
    rootLabel: string;
    rootNames: Array<string>;
    rootProperties: HSIStructNode;
    unit: string;
    volume: Array<number>;
    extRefsChunkSize: number;
    numLinks: number;
    numNodes: number;
    numLeafNodes: number;
    numAuxNodes: number;
    hasExternalNodes: number;
    numPointIndices: number;
    numPrimitives: number;
    numShapeInstances: number;
    numShapes: number;
    subDirSplitting: number;
    shapeInstanceSplitting: number;
    keys: Array<string>;
}
export type IndexL3DSnippet = {
    cache?: IndexL3DCacheData;
    properties?: IndexL3DPropertyData;
    instances?: Array<L3DInstanceData>;
    source?: IndexL3DSourceData;
};
export type IndexL3D = {
    dataLayoutVersion: number;
    source: IndexL3DSourceData;
    cache: IndexL3DCacheData;
    stats: IndexL3DStatisticsData;
    properties: IndexL3DPropertyData;
};
export interface L3DInstanceData {
    parentInstanceRootId: number;
    instanceRootId: number;
    refNodeID: number;
    refNodeDepth: number;
    refNodeLeafIdx: number;
    refParentNodeId: number;
    l3dInstanceID: number;
    l3dStoreID: number;
    parentNodeIdOffset: number;
    nodeIdOffset: number;
    nodeIdRange: number;
    auxStructureIdOffset: number;
    auxStructureIdRange: number;
    geoPagesIdOffset: number;
    geoPagesIdRange: number;
    geoPageContainerIdOffset: number;
    geoPageContainerIdRange: number;
    auxGeoPageContainerIdOffset: number;
    auxGeoPageContainerIdRange: number;
    shapeInstanceIdOffset: number;
    shapeInstanceIdRange: number;
    transformFromParent: number[];
    label: string;
}
export type ExternalReferencesEntry = {
    instances: Array<L3DInstanceReferenceData>;
    url?: string;
    resourceID?: string;
    signature?: string;
};
export type L3DInstanceReferenceData = {
    localTransform: Array<number>;
    globalTransform?: Array<number>;
    materialRef: string;
    label: string;
    names: Array<string>;
    node: number;
    parent: number;
    depth: number;
    leafIdx: number;
    linkIndex?: number;
    description: Array<string>;
    enabled?: boolean;
    appearanceURI?: string;
    renderMode?: RenderMode;
    pickable?: boolean;
};
export type ExternalReferencesJSON = {
    references: Array<ExternalReferencesEntry>;
};
export type LeafNodesJSON = Array<number>;
export type LeafNodeVolumesJSON = Array<Array<number>>;
export type PageVolumesJSON = {
    pages: Array<{
        volume: Array<number>;
        layers?: Array<number>;
        priority?: Array<number>;
    }>;
};
export type PageDescIndexMap = {
    [key: string]: number;
};
export type SpatialLeafNodesOctreeNode = {
    childrenIdx: Uint32Array;
    leafNodeIdx: Uint32Array;
    leafNodeNum: Uint32Array;
    boxVolume: BoxVolume;
};
export type SpatialLeafNodes = {
    headerString: string;
    majorVersion: number;
    minorVersion: number;
    numOctreeNodes: number;
    numLeafNodes: number;
    octreeNodes: Array<SpatialLeafNodesOctreeNode>;
    leafNodes: Uint32Array;
};
export type KeyIndexJSON = Array<{
    firstValue: string;
    startNodeId: number;
    lastValue: string;
    lastNodeId: number;
}>;
export type KeyMapListJSON = Array<{
    keyValue: string;
    nodeIds: Array<number>;
}>;
export type LabelToIDMap = {
    [key: string]: number;
};
export type ShapeInstanceExternalIDMap = {
    externalID: string;
    faces: Array<number>;
};
export type ShapeInstanceExternalIDMapsJSON = Array<ShapeInstanceExternalIDMap>;
export type ShapeInstanceIDToStructNodeMap = Array<number>;
export type StructNodeToShapeInstanceIDMap = {
    shapeInstanceIds: Array<number>;
    nodeToShapeInstanceMap: Array<number>;
};
export type LocalIDMapping = Uint32Array;
export type ForwardMapEntry = {
    subMeshIDs: Array<number>;
    pageRef: string;
};
export type ForwardMap = Array<PageRefSubMeshMap>;
export type PageRefSubMeshMap = {
    [key: string]: Array<number>;
};
export interface HSIStructNode {
    id?: number;
    children?: Array<number>;
    leafNodeRange: Array<number>;
    parent: number;
    transform?: Array<number>;
    globalTransform?: Array<number>;
    volume?: Array<number>;
    l3dLink?: string;
    l3dLinkReps?: Array<string>;
    label?: string;
    names?: Array<string>;
    description?: Array<string>;
    metaRef?: string;
    materialRef?: string;
    numLeafNodes?: number;
    depth: number;
    layers?: Array<number>;
    disabled?: boolean;
}
export interface NodeDescription extends HSIStructNode {
    isInstanceRoot?: boolean;
    nodeRepresentation?: NodeRepresentation;
    enabled?: boolean;
    appearanceURI?: string;
    renderMode?: RenderMode;
    pickable?: boolean;
}
export const structHSINodeProperties: Array<PropID>;
export const auxStructNodeProperties: Array<PropID>;
export interface StructHSI extends Array<HSIStructNode> {
    containerNumber: number;
    idOffset: number;
    isAux: boolean;
}



export enum XRCapabilities {
    SLAM = 0,
    REMOTE_CONTROLLABLE = 1,
    MODELTRACKER = 2,
    IMAGE_SOURCE = 3,
    SHARED_ANCHOR_MS = 4,
    BOOSTER_FORWARD_AVAILABLE = 5,
    CAMERA_SERVICE_AVAILABLE = 6
}
export enum XRState {
    UNKNOWN = 0,
    STOPPED = 1,
    FOLLOWING = 2,
    FIXATED = 4,
    STARTED = 8
}
export enum ModelTrackingState {
    START = 0,
    INIT = 1,
    SNAPPED = 2,
    GENERIC = 4,
    UNKNOWN = 8
}
export enum ImageAdapterConnectionState {
    START = 0,
    FAILED = 1,
    CONNECTING = 2,
    CONNECTED = 4,
    GENERIC = 8,
    UNKNOWN = 16
}
export enum ModelTrackerConnectionState {
    START = 0,
    FAILED = 1,
    CONNECTING = 2,
    CONNECTED = 4,
    UNKNOWN = 8
}
export enum WorldMappingStatus {
    NOT_AVAILABLE = 0,
    LIMITED = 1,
    EXTENDING = 2,
    MAPPED = 3,
    UNKNOWN = 4
}
export enum XRSessionConnectionState {
    INIT = 0,
    CONNECTING = 1,
    CONNECTED = 2
}
export type XRSessionState = {
    connectionState: XRSessionConnectionState;
};
export type XRMemberInfo = {
    sessionMemberData: ISessionMemberData;
    sessionMemberId: number;
    xrCapabilities: Array<XRCapabilities>;
};
export type ModelTrackerSettings = {
    modelTrackingThreshold?: TrackingSettingData;
    smoothness?: TrackingSettingData;
};
export type XRMemberState = {
    imageAdapterConnectionState?: ImageAdapterConnectionState;
    modelTrackerConnectionState?: ModelTrackerConnectionState;
    modelTrackingState?: ModelTrackingState;
    modelTrackerSettings?: ModelTrackerSettings;
    worldTrackingState?: WorldMappingStatus;
    started?: boolean;
    following?: boolean;
    fixated?: boolean;
};
export type XRMemberSettings = {
    /**
   * @experimental
   *
   * This is a normalized threshold for the modeltracker. The threshold determines the actual
   * correspondence of the generated line model to the real world. A value of 1 means total correspondence,
   * while a value of zero means no correspondence at all. Depending on that value the tracker will trigger
   * a REALITY_MODELTRACKERSTATE_CHANGED event with the ModelTrackingState.SNAPPED to true and a REALITY_XRSTATE_CHANGED event
   * with XRState.FIXATED set to true
   */
    modeltrackerQualityThreshold?: number;
    /**
   * @experimental
   *
   * This enables or disables the edge images to be send from the modeltracker. If set to true it will trigger
   * REALITY_MODELTRACKER_EDGEIMG_RECEIVED events once an debug image arrives. Note: When enabled this will impact
   * bandwidth and perfomance of the application, so we recommand using this only on demand.
   */
    enableDebugImages?: boolean;
    /**
   * @experimental
   *
   * This is a normalized input value for smoothing of the incoming tracker pose,
   * so frequent pose adjustments will be smoothed in, instead of applied directly.
   * A value of 0 will disable pose smoothing and a value of 1.0 will apply maximum smoothness
   */
    modelTrackerSmoothingFactor?: number;
};
export type XRMemberDebugSettings = {
    /**
    * @experimental
    *
    * Request a service state dump, which will be send over the debugInfo
    * channel (TrackerDebugInfo flatbuffer)
    */
    requestStateReport?: boolean;
    /**
   * @experimental
   *
   * Enables live stats communication from tracker service to the client
   * which will be send over the debugInfo
   * channel (TrackerDebugInfo flatbuffer)
   */
    requestServiceStatsLive?: boolean;
};


export enum ResourceName {
    Content = "TranscoderService",
    ResourceGateway = "ResourceGateway",
    DeliveryService = "DeliveryService",
    QueryService = "QueryService",
    MeasurementService = "MeasurementService",
    VisService = "VisService",
    SharedSessionService = "SharedSessionService",
    SpaceStoreService = "SpaceStoreService",
    TrackerService = "TrackerService",
    GeometryService = "GeometricService",
    CameraService = "CameraService"
}
export enum ResourceEndpointName {
    ContentDelivery = "ContentDelivery",
    ResourceAPI = "ResourceAPI",
    ResourceSubscriptionAPI = "ResourceAPI",
    DeliveryDataAPI = "DeliveryDataAPI",
    QueryDataAPI = "QueryDataAPI",
    MeasurementAPI = "MeasurementAPI",
    RenderAPI = "naVisAPI",
    RenderBufferAPI = "bufferStreamAPI",
    SharedSessionAPI = "SharedSessionAPI",
    SharedSessionEventAPI = "SharedSessionEventAPI",
    SharedSessionLogAPI = "SharedSessionLogAPI",
    SessionStoreAPI = "SessionStoreAPI",
    SpaceStoreAPI = "SpaceStoreAPI",
    TrackerAPI = "trackerAPI",
    TrackerBufferAPI = "bufferStreamAPI",
    CappingAPI = "geometricAPI",
    CameraServiceAPI = "CameraServiceAPI",
    CameraServiceImageRawAPI = "CameraServiceImageRawAPI",
    CameraServiceImagePoseAPI = "CameraServiceImagePoseAPI",
    CameraServicePoseInjectAPI = "CameraServicePoseInjectAPI"
}
export type ResourceData = ContentData | ResourceGatewayData | DeliveryServiceData | MeasurementServiceData | RenderServiceData | SharedSessionServiceData | TrackerServiceData | GeometryServiceData;
export type ContentData = IndexL3D;
export type ResourceGatewayData = {};
export type DeliveryServiceData = {};
export type QueryServiceData = {};
export type MeasurementServiceData = {};
export type RenderServiceData = {};
export type SharedSessionServiceData = {
    sessionId: string;
};
export type SessionStoreServiceData = {};
export type TrackerServiceData = {};
export type GeometryServiceData = {};
export type CameraServiceData = {};
export type ResourceParams = ContentParams | ResourceGatewayParams | DeliveryServiceParams | MeasurementServiceParams | RenderServiceParams | SharedSessionServiceParams | TrackerServiceParams | GeometryServiceParams | CameraServiceData;
export type ContentParams = {
    resultContentType: string;
    inputContentType?: string;
    class: string;
    inputUri: string;
    hints?: {
        [key: string]: any;
    };
};
export type ResourceGatewayParams = {};
export type DeliveryServiceParams = {};
export type MeasurementServiceParams = {};
export type RenderServiceParams = {
    class: string;
    output: string;
    sessionId: string;
    sessionToken?: string;
};
export type SharedSessionServiceParams = {
    sessionId?: string;
    scenarioTemplate?: string;
};
export type TrackerServiceParams = {
    class: string;
    sessionId?: string;
    sessionToken?: string;
};
export type GeometryServiceParams = {};
export type CameraServiceParams = {
    class?: string;
};


export type SessionStreamMessageCallback = (message: string | ArrayBuffer) => void;
export type SessionStreamStateChangeCallback = (connectionData: IStreamStateData) => void;
export type OnPublishedStreamCallback = (stream: ISessionStreamData) => void;
export interface JoinSessionRequestContent {
    scenarioUri?: string;
    name?: string;
    roleHints?: string | Array<string>;
    confidence?: number;
    deviceTags?: Array<string>;
    spaceDomain?: string;
    settings?: Object;
    token?: string;
    forwardURL?: string;
}
export interface InteractionContext {
    currentFollowedUser?: number;
    followStreamID?: number;
    update?: () => void;
}
export interface ISessionMemberData {
    name?: string;
    deviceTags?: Array<string>;
    assignedRoles?: Array<string>;
    assignedDirectives?: Array<string>;
    memberId?: number;
    roleHints?: Array<string>;
    spaceDomain?: string;
    settings?: {
        [key: string]: any;
    };
    privileges?: Array<MemberPrivileges>;
}
export interface SessionStreamCondition {
    streamId?: number;
    name?: string;
    content?: string;
    contentType?: string;
    connectionType?: string;
    location?: string;
    memberId?: number;
    metadata?: any;
    [key: number]: any;
}
export interface ISessionStateData extends ISessionMemberData {
    state?: SessionConnectionState;
    sessionUri?: string;
    scenarios: Array<string>;
    sessionWsUri?: string;
    sessionId?: string;
    sessionWasEmpty?: boolean;
    hidden?: boolean;
}
export interface IStreamStateData {
    streamId: number;
    subscriberCount?: number;
    interest?: boolean;
    available?: boolean;
    location?: string;
    signal?: StreamSignal;
}
export type StreamSignal = {
    [key: string]: any;
};
export type StreamTransMissionHints = {
    frameSkipThreshold?: number;
};
export interface ISessionStreamData {
    streamId?: number;
    name: string;
    content: string;
    contentType: string;
    connectionType: string;
    location?: string;
    memberId: number;
    metadata?: any;
    space?: string;
    transmissionHints?: StreamTransMissionHints;
}
export interface LogEntry {
    identifier: string;
    level: string;
    class: string;
    component: string;
    periodic: boolean;
    step: string;
    token: string;
    time: string;
    message: string;
    sharedSessionId: string;
    userSessionId: string;
}
export enum LogLevel {
    FATAL = 0,
    ERROR = 1,
    WARNING = 2,
    INFO = 3,
    DEBUG = 4,
    TRACE = 5
}

export interface SetLayerFilterEnabledResult {
    layerFilterName: string;
    value: boolean;
    hasChanged: boolean;
}



export type SetPropertyResults = {
    results: Array<SetPropertyResult>;
    hasChanged: boolean;
};
export type SetPropertyResult = {
    nodeID: number;
    property: PropertyName;
    oldValue: PropertyType<any>;
    newValue: PropertyType<any>;
    hasChanged: boolean;
};





export type StateSyncData = {
    sessionStore: ISessionStore;
    syncData: SessionSyncData | SessionSyncDataMap;
    memberId: number;
};

export interface DebugEventData {
    type: string;
}
export interface TrackingStatusData {
    name: string;
    state: string;
    quality: number;
    _InitInlierRatio: number;
    _InitNumOfCorresp: number;
    _TrackingInlierRatio: number;
    _TrackingNumOfCorresp: number;
    _SFHFrameDist: number;
    _Total3DFeatureCount: number;
    _NumberOfTemplates: number;
    _NumberOfTemplatesOnline: number;
    _NumberOfTemplatesOffline: number;
    _TrackingImageWidth: number;
    _TrackingImageHeight: number;
}
export interface TrackingSettingData {
    displayName: string;
    key: string;
    minValue: number;
    maxValue: number;
    stepSize: number;
    currentValue: number;
    description: string;
    dynamic: boolean;
    showQualityThreshold: boolean;
}
export interface TrackingDebugEventData extends DebugEventData {
    data: {
        state: {
            objects: Array<TrackingStatusData>;
        };
        settings: Array<TrackingSettingData>;
        misc: {
            debugPort: number;
        };
    };
}

export type VersionInfo = {
    build: string;
    date: string;
    platform: string;
    revisionHare: string;
    revisionWebVis: string;
    time: string;
    version: string;
};


export type InteractionEventData = {
    event: Event;
    pointerX: number;
    pointerY: number;
    normalizedPointerX: number;
    normalizedPointerY: number;
    trigger: PointerActionTrigger;
    type: PointerActionType;
    timestamp: number;
    delta: number;
    pointerOutsideCanvas: boolean;
    viewer: ViewerAPI;
};















export interface IClickResult extends ITopologyDataSelector {
    normalizedPointerCoords: Float32Array;
    canvasCoords: Float32Array;
    position: Float32Array;
    normal: Float32Array;
    drawableID: number;
    pickListener: any;
    subMesh: number;
    dataURI: string;
    meshID: string;
    vertexID: number;
    collectionID: number;
    selectedTarget: string;
    selectedValue: any;
    selectedTargetName: string;
    arcInfo: ArcMeasurementInfo;
    trigger: PointerActionTrigger;
    actionType: PointerActionType;
    nodeID: number;
    targetNodeID: number;
    viewer: ViewerAPI;
    isMultiSelection: boolean;
    isClientPoint: boolean;
    requestTopologyDataSelector(): Promise<ITopologyDataSelector>;
    isPoint(): boolean;
    isFace(): boolean;
    isEdge(): boolean;
    getPointerInfo(): IPointerInfo;
}
export type PointerInfoCallback = () => Promise<ITopologyDataSelector>;
export interface IPointerInfo {
    normalizedPointerCoords: Float32Array;
    canvasCoords: Float32Array;
    position: Float32Array;
    normal: Float32Array;
    actionType: PointerActionType;
    nodeID: number;
    targetNodeID: number;
    viewer: ViewerAPI;
}
/**
 * @hidden
 */
export interface IViewerHighlightSelector {
    dataSelector: ITopologyDataSelector;
    color?: Float32Array;
    clipHighlight?: boolean;
    facesHighlightOnTop?: boolean;
    exclusiveClipplanes?: Array<number>;
}
export enum PointerActionTrigger {
    NONE = 0,
    FIRST = 1,
    SECOND = 2,
    THIRD = 3,
    WHEEL = 4,
    TOUCH = 5
}
export enum PointerActionType {
    NONE = 0,
    CLICKED = 1,
    PRESSED = 2,
    RELEASED = 3,
    DOUBLECLICKED = 4,
    TOUCH_PICKED = 5,
    TOUCH_PRESSED = 6,
    TOUCH_DOUBLE_PICKED = 7,
    ANY = 8
}
/**
 * With webVis, you can have multiple webvis-viewer elements. Therefore, functions to control the view
 * and navigation behavior are available on the respective webvis-viewer object, and not as part of
 * the global webVis API. If you have defined one or multiple webvis-viewer elements, you can access
 * a particular viewer, using its ID attribute:
 *
 * <code>
 * //fits view on my-viewer-23                              <br>
 * webvisViewer("my-viewer-23").fitView();                  <br>
 * </code>
 * <br>
 *
 * If you are using the webvis-full convenience element, you can also specify its ID as a parameter,
 * instead of providing the ID of a viewer:
 *
 * <code>
 * //fits view on the viewer of my-webvis-full-42           <br>
 * webvisViewer("my-webvis-full-42").fitView();             <br>
 * </code>
 *
 */
export interface ViewerAPI extends ViewerInteractionAPI, ViewerCursorAPI, ViewerGizmoAPI, ViewerHighlightAPI, ViewerUserGeometryAPI, ViewerTopologyAPI {
    getContext(): ContextAPI;
    getID(): string;
    destroy(): void;
    /**
     * Changes the viewer setting with the given name to the given value.
     *
     * @param viewerSetting Specifies a particular viewer setting which one would like to change
     * @param value         A new value for the specified setting
     */
    changeSetting(viewerSetting: string, value: any): void;
    /**
     * Returns the value of a viewer setting.
     *
     * @param  viewerSetting The name of a particular setting whose value one wants to read
     *
     * @return               The value of the specified setting
     */
    readSetting(viewerSetting: string): any;
    /**
     * Positions the camera such that the whole geometry is fitting into the view. The view and up
     * parameter allow to define a viewing direction and roll for the resulting camera pose.
     *
     * @param view Defines the desired viewing direction
     * @param up   Defines the desired camera orientation in conjunction with the viewing direction
     * @param {number} [transitionTime=100]   Defines the transition time for the camera movement
     */
    fitView(view?: Float32Array, up?: Float32Array, transitionTime?: number): Promise<void>;
    /**
     * Positions the camera such that the node’s bounding box is fitting into the view. The view and up
     * parameter allow to define a viewing direction and roll for the resulting camera pose.
     *
     * @param nodeID The ID of the node on which one wants to fit the view
     * @param view   The direction in which the camera will look on the node
     * @param up     The orientation in which the camera will look on the node
     * @param {number} [transitionTime=100]   Defines the transition time for the camera movement
     */
    fitViewToNode(nodeID: number, view?: Float32Array, up?: Float32Array, transitionTime?: number): Promise<void>;
    /**
     * Positions the camera such that the aux node is fitting into the view.
     *
     * @param nodeID The ID of the node on which one wants to fit the view
     * @param {number} [transitionTime=100]   Defines the transition time for the camera movement
     */
    fitViewToAuxNode(nodeID: number, transitionTime?: number): Promise<void>;
    /**
     * Positions the camera such that the view is focused onto the given volume. The view and up
     * parameter allow to define a viewing direction and roll for the resulting camera pose.
     *
     * @param volume A particular volume on which the view will be fitted
     * @param view   Specifies the direction in which the camera will look on the volume
     * @param up     Specifies the orientation in which the camera will look on the volume
     * @param {number} [transitionTime=100]   Defines the transition time for the camera movement
     */
    fitViewToVolume(volume: BoxVolume, view?: Float32Array, up?: Float32Array, transitionTime?: number): Promise<void>;
    /**
     *
     * @param rectangle
     * @param {number} [transitionTime=1000]   Defines the transition time for the camera movement
     */
    fitViewToRectangle(rectangle: ClientRect, transitionTime?: number): Promise<void>;
    /**
     * Positions the camera such that it looks from a specific direction.
     * @param {ViewDirection} [direction=ViewDirection.CURRENT] The direction to fit.
     * @param {number} [transitionTime=100]   Defines the transition time for the camera movement
     */
    fitViewToDirection(direction: ViewDirection, transitionTime?: number): Promise<void>;
    /**
     * Returns the center of rotation being the point around which the camera rotates around.
     */
    getCenterOfRotation(): Float32Array;
    /**
     * Sets the center of rotation being the point around which the inspection camera rotates. If no
     * center parameter is supplied the center of rotation is set to the center of all currently loaded
     * models.
     *
     * @param center The center of rotation
     */
    setCenterOfRotation(center?: Float32Array): void;
    /**
     * Sets the camera to the initial position
     */
    restoreInitView(): void;
    /**
     * Sets the camera position, its target and the up-vector. If the up-vector is not defined, the
     * previous up-vector is kept.
     *
     * @param position Specifies the new position or center of the camera
     * @param target   Specifies the point on which the camera will look
     * @param upVector Specifies the new orientation of the camera
     * @param {number} [transitionTime=0]   Defines the transition time for the camera movement
     */
    setView(position: Float32Array, target: Float32Array, upVector?: Float32Array, transitionTime?: number): Promise<void>;
    /**
     * Sets the camera view matrix.
     *
     * @param matrix The new view matrix for the camera
     * @param {number} [transitionTime=0]   Defines the transition time for the camera movement
     */
    setViewMatrix(matrix: Float32Array, transitionTime?: number): Promise<void>;
    /**
     * Animates to the given viewmatrix
     *
     * @param matrix The new view matrix for the camera
     * @param {number} [transitionTime=600]   Defines the transition time for the camera movement
     */
    animateViewToViewmatrix(matrix: Float32Array, transitionTime?: number): Promise<void>;
    /**
     * Return the current Camera position
     *
     * @returns {Float32Array} The current Camera position
     */
    getCameraPosition(): Float32Array;
    /**
     * Return the current Camera projection tyxpe
     *
     * @returns {CameraProjectionType} The current Camera projection tyxpe
     */
    getCameraProjectionType(): CameraProjectionType;
    /**
     * Returns the current view matrix.
     *
     * @return The current view matrix of the camera
     */
    getViewMatrix(): Float32Array;
    /**
     * Sets the current projection matrix.
     *
     * @param matrix The new projection matrix
     */
    setProjectionMatrix(matrix: Float32Array): void;
    /**
     * Returns the current projection matrix.
     *
     * @return The current projection matrix
     */
    getProjectionMatrix(): Float32Array;
    /**
     * Flips the auxiliaries with respect to the current view
     */
    flipAuxToView(): void;
    /**
     * Toggles the state of the 3D navigation (on or off).
     *
     * @param {boolean} flag
     */
    enableNavigation(flag?: boolean): void;
    takeScreenshot(callback: (url: string) => void, mimeType?: string, width?: number, height?: number): void;
    requestScreenshot(width?: number, height?: number, mimeType?: string, resetCanvasSize?: boolean): Promise<string>;
    getAvailableRenderingEffects(): Array<string>;
    getAvailableRenderingSettings(): Array<string>;
    getCoordSys(): string;
    getCoordSysUpVector(): Float32Array;
    getCoordSysRightVector(): Float32Array;
    getCanvasHeight(): number;
    getCanvasWidth(): number;
    getCanvasElement(): HTMLCanvasElement;
    getBoundingClientRect(): ClientRect;
    unprojectPoint(inVector: Float32Array, outVector: Float32Array): void;
    trimSegmentToFrustum(pt0: Float32Array, pt1: Float32Array, ignoreNear?: boolean): boolean;
    projectPoint(inVector: Float32Array, outVector: Float32Array): void;
    projectPointToCanvas(inVector: Float32Array, outVector: Float32Array): void;
    unprojectPointFromCanvas(inVector: Float32Array, outVector: Float32Array): void;
    getActiveItem(): ActiveItemInfo;
    setActiveItem(id: number, type: NodeType): void;
    getVectoresForDirection(direction: number, view: Float32Array, up: Float32Array): void;
    rotateCoordSystem(frontPlaneStr: string, outMatrix: Float32Array): Float32Array;
    resetPerspectiveFOV(): void;
    setDynamicClippingPlaneDistance(value: number): void;
    enableDynamicClippingPlane(flag: boolean): void;
    fitToClipPlane(clipPlaneID: number): void;
    animateViewToVolume(volume?: BoxVolume, view?: Float32Array, up?: Float32Array, transitionTime?: number): Promise<void>;
    focusOnDoubleClick(): boolean;
    isNavigationEnabled(): boolean;
    setUserInputActive(flag: boolean): void;
    startAreaSelection(startX: number, startY: number): Promise<ClientRect>;
    highlightScope(nodeID: number): void;
    unhighlightScope(nodeID: number): void;
    setVolatileHighlightEnabled(flag: boolean): void;
    applyMemorySettings(): void;
    openRenderServiceDebugPage(): void;
    /**
     * The viewer is destroyed and reinitialized with renderSetup selection
     */
    reset(): void;
}

export enum CursorMode {
    DEFAULT = 0,
    CROSSHAIR = 1,
    SELECT = 2,
    DESELECT = 3,
    COPY = 4,
    EXPAND_SELECT = 5
}
export interface ViewerCursorAPI {
    setCursorMode(cursorMode: CursorMode): void;
}


export enum GizmoType {
    None = 0,
    TransformationGizmo = 1,
    ClipplaneGizmo = 2,
    SelectionBoxGizmo = 3,
    SelectionTransformationGizmo = 4,
    ClippingBoxGizmo = 5,
    CORGizmo = 6,
    RotationSphereGizmo = 7
}
export enum TransformationGizmoMode {
    Translation = 1,
    Rotation = 2,
    Scaling = 4,
    TranslationRotation = 5,
    ScaleRotation = 6
}
export interface ViewerGizmoAPI {
    getCurrentGizmoType(): GizmoType;
    getValidTransformationGizmoModes(): number;
    setTransformationGizmoMode(mode: TransformationGizmoMode): void;
    showSelectionBoxGizmo(size?: Float32Array | number, transform?: Float32Array | number): void;
    showSelectionBoxGizmoFromVolume(volume?: BoxVolume): void;
    showSelectionTransformationGizmo(): void;
    showClippingBoxGizmo(clipRoomID: number): void;
    hideGizmo(): void;
    createCollectionFromGizmo(includeOverlappingNodes: boolean): Promise<number>;
    getGizmoSize(): Float32Array;
    getGizmoTransform(): Float32Array;
    setCORGizmoVisible(flag: boolean): void;
    showPointMarker(position: number[] | Float32Array, index?: number): void;
    showAxisMarker(values: number[] | Float32Array, scale?: number, index?: number): void;
    hidePointMarker(index?: number): void;
    hideAllPointMarkers(): void;
    hideAllLineMarkers(): void;
    hideAllMarkers(): void;
}



export interface HighlightParameters {
    color?: Float32Array;
    clipHighlight?: boolean;
    facesHighlightOnTop?: boolean;
    exclusiveClipplanes?: Array<number>;
}
export interface ViewerHighlightAPI {
    /**
     * Enable highlighting of the entity , which matches the attributes informed in the viewerDataSelector
     *
     * @param selector : IViewerHighlightSelector
     *
     * @param highlightParameters
     * @return the highlightHandle, which it reqed to remove the highlighting
     */
    highlightEntity(selector: ITopologyDataSelector | PointerInfoCallback, highlightParameters?: HighlightParameters): Promise<number>;
    highlightArc(pickedPt1: Float32Array, pickedPt3: Float32Array, center: Float32Array, axis: Float32Array, angle: number, measurementID: number): number;
    highlightBBox(center: Float32Array, size: Float32Array): number;
    highlightPoint(position: Float32Array, markerIndex: number): void;
    highlightLine(values: number[], scale: number, markerIndex: number): void;
    /**
     * Disable highlighting for the handle
     *
     * @param highlightHandle : number
     */
    dehighlightEntity(highlightHandle?: number): void;
}


export interface IViewerInteractionListener {
    viewChanged?(viewMatrix: Float32Array): void;
    onMouseDown?(interactionData: InteractionEventData): void;
    onMouseMove?(interactionData: InteractionEventData): void;
    onMouseUp?(interactionData: InteractionEventData): void;
    onMouseEnter?(interactionData: InteractionEventData, nodeID: number): void;
    onMouseOut?(interactionData: InteractionEventData, nodeID: number): void;
    onClick?(interactionData: InteractionEventData, nodeID: number): void;
    onAreaSelectionStarted?(rect: ClientRect): void;
    onAreaSelectionEnded?(rect: ClientRect): void;
}
export interface ViewerInteractionAPI {
    registerViewerInteractionListener(listener: IViewerInteractionListener): void;
    unregisterViewerInteractionListener(listener: IViewerInteractionListener): void;
    enableSnapping(useSnapping: boolean): void;
    isSnappingEnabled(): boolean;
}

export interface ViewerPainterAPI {
    startPaintStroke(normPosX: number, normPosY: number): void;
    updatePaintStroke(normPosX: number, normPosY: number): void;
    endPaintStroke(): void;
}



export interface ViewerTopologyAPI {
    requestTopologyDataSelector(data: IClickResult | IPointerInfo): Promise<ITopologyDataSelector>;
    requestTopologyDataEntry(selector: ITopologyDataSelector): Promise<ITopologyDataEntry>;
}

export interface IUserGeometryData {
    identifier?: string;
    matrix?: Float32Array;
    volume?: Array<number>;
    appearance?: {
        diffuse?: Array<number>;
        emissive?: Array<number>;
        specular?: Array<number>;
    };
    selector?: string;
    enabled?: boolean;
    occluder?: boolean;
    geometry: {
        buffers: {
            [key: string]: IBufferData;
        };
        primitiveType?: any;
        numElements: number;
    };
    resources?: {
        [key: string]: any;
    };
    shader?: any;
}
export interface IAttributeData {
    resourceType: any;
    componentCount: number;
    normalize?: boolean;
    stride?: number;
    offset?: number;
}
export interface IResourceData {
    resourceType: any;
    data: ArrayBufferView;
}
export interface IBufferData {
    buffer: IResourceData;
    attributes: {
        [key: string]: IAttributeData;
    };
}
export interface ViewerUserGeometryAPI {
    createGeometry(userGeoData: IUserGeometryData): number;
    updateGeometry(id: number, data: IUserGeometryData): void;
    removeGeometry(id: number): void;
}

export enum HoveringLabel {
    NODE_LABEL = 0,
    RESOURCE_LABEL = 1
}
export enum CameraProjectionType {
    PERSPECTIVE = 0,
    ORTHOGRAPHIC = 1
}
export enum ViewerLightingEnvironment {
    HEADLIGHT = 0,
    FOUR_POINT_LIGHTING = 1,
    FIVE_POINT_LIGHTING = 2
}

}
declare var webvisViewer : (identifier? : string) => webvis.ViewerAPI;
declare var webvisContext : (identifier? : string) => webvis.ContextAPI;
