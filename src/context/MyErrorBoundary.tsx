import React, { Component, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export class MyErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Lỗi trong ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div>Đã xảy ra lỗi khi hiển thị phân trang.</div>;
        }
        return this.props.children;
    }
}
