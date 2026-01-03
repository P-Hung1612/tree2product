//implementation of the Entity base class
// sử dụng để định nghĩa các entity trong hệ thống với id duy nhất và phương thức so sánh
import { v4 as uuidv4 } from 'uuid';

export abstract class Entity<T> {
    protected readonly _id: string;
    protected props: T; //properties của entity

    // Khởi tạo entity với properties và id (nếu không có sẽ tự tạo id mới)
    constructor(props: T, id?: string) {
        this._id = id ? id : uuidv4();
        this.props = props;
    }

    get id(): string {
        return this._id;
    }

    // Helper để so sánh 2 entity có giống nhau không
    public equals(object?: Entity<T>): boolean {
        if (object == null || object == undefined) {
            return false;
        }

        if (this === object) {
            return true;
        }

        if (!isEntity(object)) {
            return false;
        }

        return this._id === object._id;
    }
}

// Hàm helper kiểm tra kiểu
const isEntity = (v: any): v is Entity<any> => {
    return v instanceof Entity;
};