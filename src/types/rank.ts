export interface Rank {
    "im:name": ImName
    "im:image": ImImage[]
    "im:itemCount": ImItemCount
    "im:price": ImPrice
    "im:contentType": ImContentType
    rights: Rights
    title: Title
    link: Link
    id: Id
    "im:artist": ImArtist
    category: Category
    "im:releaseDate": ImReleaseDate
    isMerge?: boolean;
  }
  
export interface ImName {
    label: string
}

export interface ImImage {
    label: string
    attributes: Attributes
}

export interface Attributes {
    height: string
}

export interface ImItemCount {
    label: string
}

export interface ImPrice {
    label: string
    attributes: Attributes2
}

export interface Attributes2 {
    amount: string
    currency: string
}

export interface ImContentType {
    "im:contentType": ImContentType2
    attributes: Attributes4
}

export interface ImContentType2 {
    attributes: Attributes3
}

export interface Attributes3 {
    term: string
    label: string
}

export interface Attributes4 {
    term: string
    label: string
}

export interface Rights {
    label: string
}

export interface Title {
    label: string
}

export interface Link {
    attributes: Attributes5
}

export interface Attributes5 {
    rel: string
    type: string
    href: string
    }

export interface Id {
    label: string
    attributes: Attributes6
}

export interface Attributes6 {
    "im:id": string
}

export interface ImArtist {
    label: string
    attributes: Attributes7
}

export interface Attributes7 {
    href: string
}

export interface Category {
    attributes: Attributes8
}

export interface Attributes8 {
    "im:id": string
    term: string
    scheme: string
    label: string
}

export interface ImReleaseDate {
    label: string
    attributes: Attributes9
}

export interface Attributes9 {
    label: string
}
