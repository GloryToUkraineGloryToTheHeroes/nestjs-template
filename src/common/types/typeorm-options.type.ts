export interface TypeormOptionsInterface<OF, RF> {
  orderFields?: Array<keyof OF>;
  relationFields?: RF;
}
