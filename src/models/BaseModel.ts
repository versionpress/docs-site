export class BaseModel {
    toJson():string {
        return JSON.stringify(this);
    }
}