export class Place {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public imageUrl: string,
    public price: string,
    public availableFrom: string,
    public availableTo: string,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public UserId: string
  ) {}
}
