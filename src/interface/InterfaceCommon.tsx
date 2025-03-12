export interface HoaTieu {
    id: string;

    name: string;
    rank: string;
    image: string;
}


export interface Tintuc {
    id: number;
    title: string;
    subtitle?: string;
    content: string;
    postdate: string;
    image: string;
    status?: string;
}


// import { Tintuc } from 'path/to/your/types'; (nếu bạn có file type riêng)

interface NewsListGridProps {
    items: Tintuc[]; // <-- Dùng type đầy đủ
    onItemClick?: (item: Tintuc) => void;
    imageBaseUrl?: string;
}



export interface Dichvu {
    id: string;

    title: string;
    subtitle: string;
    image: string;
    status: string;
    content: string;
    postdate: string;

}

export interface BanLanhDao {
    id: string;

    title: string;
    subtitle: string;
    image: string;
    status: string;
    content: string;
    postdate: string;

}


export interface Lichsu {
    id: string;

    title: string;
    subtitle: string;
    image: string;
    status: string;
    content: string;
    postdate: string;

}

export interface Giadichvu {
    id: string;

    title: string;
    subtitle: string;
    image: string;
    status: string;
    content: string;
    postdate: string;

}