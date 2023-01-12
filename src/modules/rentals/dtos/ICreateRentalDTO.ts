interface ICreateRentalDTO {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
    total?: number;
    id?: string;
    end_date?: Date;
}

export { ICreateRentalDTO };