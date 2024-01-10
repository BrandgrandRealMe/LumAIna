import type { EventEmitter } from "events";

declare interface Tag {
    text: string;
    color: string;
}

declare interface User {
    _id: string; // user id
    name: string;
    color: string;
    tag?: Tag;
}

declare interface Participant extends User {
    id: string; // participant id (same as user id on mppclone)
}

declare type ChannelSettings = {
    color: string;
    crownsolo: boolean;
    chat: boolean;
    visible: boolean;
    limit: number;
} & Partial<{
    color2: string;
    lobby: boolean;
    owner_id: string;
    "lyrical notes": boolean;
    "no cussing": boolean;
    noindex: boolean;
}>;

declare type ChannelSettingValue = Partial<string | number | boolean>;

declare type NoteLetter = `a` | `b` | `c` | `d` | `e` | `f` | `g`;
declare type NoteOctave = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

declare interface Note {
    n: `${NoteLetter}${NoteOctave}`;
    d: number;
    v: number;
    s?: 1;
}

declare type Notification = Partial<{
    duration: number;
    class: string;
    id: string;
    title: string;
    text: string;
    html: string;
    target: string;
}>;

declare type CustomTarget = {
    global?: boolean;
} & (
    | {
          mode: "subscribed";
      }
    | {
          mode: "ids";
          ids: string[];
      }
    | {
          mode: "id";
          id: string;
      }
);

declare interface Crown {
    userId: string;
    partcipantId?: string;
    time: number;
    startPos: {
        x: number;
        y: number;
    };
    endPos: {
        x: number;
        y: number;
    };
}

declare interface ChannelInfo {
    banned?: boolean;
    count: number;
    id: string;
    _id: string;
    crown?: Crown;
    settings: ChannelSettings;
}

declare class Client extends EventEmitter {
    public uri: string;
    public ws: WebSocket | undefined;
    public serverTimeOffset: number;
    public user: User | undefined;
    public participantId: string | undefined;
    public ppl: Record<string, Participant>;
    public connectionTime: number;
    public connectionAttempts: number;
    public desiredChannelId: string | undefined;
    public desiredChannelSettings: ChannelSettings | undefined;
    public pingInterval: number | undefined;
    public canConnect: boolean;
    public noteBuffer: OutgoingMPPEvents["n"][];
    public noteBufferTime: number;
    public noteFlushInterval: number | undefined;
    public permissions: Record<any, unknown>;
    public ["🐈"]: number;
    public loginInfo: unknown | undefined;
    public token: string;

    constructor(uri: string, token: string);

    public isSupported(): boolean;
    public isConnected(): boolean;
    public isConnecting(): boolean;

    public start(): void;
    public stop(): void;
    protected connect(): void;

    protected bindEventListeners(): void;

    public send(raw: string): void;
    public sendArray<Event extends keyof OutgoingMPPEvents>(
        arr: OutgoingMPPEvents[Event][]
    ): void;
    public setChannel(id: string, set?: Partial<ChannelSettings>): void;

    public offlineChannelSettings: ChannelSettings;

    public getChannelSetting(key: string): ChannelSettings[];
    public setChannelSettings(settings: ChannelSettings): void;

    public offlineParticipant: Participant;

    public getOwnParticipant(): Participant;
    public setParticipants(ppl: Participant[]): void;
    public countParticipants(): number;
    public participantUpdate(update: Participant): void;
    public participantMoveMouse(update: Participant): void;
    public removeParticipant(id: string): void;
    public findParticipantById(id: string): void;

    public isOwner(): boolean;
    public preventsPlaying(): boolean;
    public receiveServerTime(time: number, echo: number): void;
    public startNote(note: string, vel: number): void;
    public stopNote(note: string): void;
    public sendPing(): void;
    public setLoginInfo(loginInfo: any): void;

    public on<Event extends keyof IncomingMPPEvents>(
        event: Event,
        listener: (msg: IncomingMPPEvents[Event]) => void
    ): this;

    public emit<Event extends keyof IncomingMPPEvents>(
        event: Event,
        ...args: Parameters<(msg: IncomingMPPEvents[Event]) => void>
    ): boolean;
}

export default Client;

declare interface IncomingMPPEvents {
    a: { m: "a"; a: string; p: Participant; t: number };
    b: { m: "b"; code: string };
    c: { m: "c"; c: IncomingMPPEvents["a"][] };
    ch: { m: "ch"; p: string; ch: ChannelInfo };
    custom: { m: "custom"; data: any; p: string };
    hi: {
        m: "hi";
        t: number;
        u: User;
        permissions: any;
        token?: any;
        accountInfo: any;
    };
    ls: { m: "ls"; c: boolean; u: ChannelInfo[] };
    m: { m: "m"; x: number; y: number; id: string };
    n: { m: "n"; t: number; n: Note[]; p: string };
    notification: {
        duration?: number;
        class?: string;
        id?: string;
        title?: string;
        text?: string;
        html?: string;
        target?: string;
    };
    nq: {
        m: "nq";
        allowance: number;
        max: number;
        maxHistLen: number;
    };
    p: {
        m: "p";
        x: number;
        y: number;
    } & Participant;
    t: { m: "t"; t: number; e: number };
}

declare interface OutgoingMPPEvents {
    a: { m: "a"; message: string };
    bye: { m: "bye" };
    ch: { m: "ch"; _id: string; set: ChannelSettings };
    chown: { m: "chown"; id?: string };
    chset: { m: "chset"; set: ChannelSettings };
    custom: { m: "custom"; data: any; target: CustomTarget };
    devices: { m: "devices"; list: any[] };
    dm: { m: "dm"; message: string; _id: string };
    hi: {
        m: "hi";
        token?: string;
        login?: { type: string; code: string };
        code?: string;
    };
    kickban: { m: "kickban"; _id: string; ms: number };
    m: { m: "m"; x?: string | number; y?: string | number };
    "-custom": { m: "-custom" };
    "-ls": { m: "-ls" };
    n: { m: "n"; t: number; n: Note[] };
    "+custom": { m: "+custom" };
    "+ls": { m: "+ls" };
    t: { m: "t"; e: number };
    unban: { m: "unban"; _id: string };
    userset: {
        m: "userset";
        set: { name?: string; color?: string };
    };
    setcolor: { m: "setcolor"; color: string; _id: string };
    setname: { m: "setname"; name: string; _id: string };
}

export { OutgoingMPPEvents, IncomingMPPEvents };
