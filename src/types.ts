export interface ISegment {
  origin: string
  // Код города (iata)
  destination: string
  // Дата и время вылета туда
  date: string
  // Массив кодов (iata) городов с пересадками
  stops: string[]
  // Общее время перелёта в минутах
  duration: number
}

export interface ITicket {
    // Цена в рублях
    price: number
    // Код авиакомпании (iata)
    carrier: string
    segments: ISegment[]
  }



  export interface IGettedTicket{
    tickets: ITicket[],
    stop: boolean
  }

  export interface ISearchId {
    searchId: string;
  }
