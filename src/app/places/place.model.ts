export class Place {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public imageUrl: string,
    public price: string,
    public availableFrom: Date,
    public availableTo: Date,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public UserId: string
  ) {}
}
