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


export interface HoatDongCongTy {
    id: number;
    title: string;
    subtitle?: string;
    content: string;
    postdate: string;
    image: string;
    videourl: string;
    status?: string;
    height: number;
}


export interface LinkDathangdichvu {
    id: number;
    title: string;
    status?: string;
}



// import { Tintuc } from 'path/to/your/types'; (nếu bạn có file type riêng)



export interface Phuongtien {
    id: string;

    title: string;
    subtitle: string;
    image: string;
    status: string;
    content: string;
    postdate: string;

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


export interface ViTriDonTraHoaTieu {
    id: string;

    title: string;
    subtitle: string;
    image: string;
    status: string;
    content: string;
    postdate: string;

}


export interface VungHoaTieu {
    id: string;

    title: string;
    subtitle: string;
    image: string;
    status: string;
    content: string;
    postdate: string;

}
export interface GioDieuDong {
    id: string;
    pdfurl: string;
    title: string;
    subtitle: string;
    image: string;
    status: string;
    content: string;
    postdate: string;

}

export interface HeThongCangBien {
    id: string;
    pdfurl: string;
    title: string;
    subtitle: string;
    image: string;
    status: string;
    content: string;
    postdate: string;

}

export interface LichThuyTrieu {
    id: string;
    pdfurl: string;
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

export interface GiaDichVu {
    id: string;

    title: string;
    subtitle: string;
    image: string;
    status: string;
    pdfurl: string;
    content: string;
    postdate: string;

}