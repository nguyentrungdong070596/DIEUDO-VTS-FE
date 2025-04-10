import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // Thêm plugin default-layout
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Định nghĩa props cho component
interface DocViewerProps {
  documentUrl: string;
}

const DocViewerComponent: React.FC<DocViewerProps> = ({ documentUrl }) => {
  // Khởi tạo plugin default-layout cho PDF
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // Xác định loại file dựa trên phần mở rộng
  const fileType = documentUrl.toLowerCase().endsWith('.pdf') ? 'pdf' : 'docx';

  return (
    <div style={{ padding: '20px' }}>

      {/* Hiển thị PDF */}
      {fileType === 'pdf' && (
        <div style={{ height: '750px' }}>
          {/* <h3>PDF: {documentUrl.split('/').pop()}</h3> */}
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer
              fileUrl={documentUrl}
              plugins={[defaultLayoutPluginInstance]} // Thêm plugin để hiển thị toolbar
            />
          </Worker>
        </div>
      )}

      {/* Hiển thị DOCX */}
      {fileType === 'docx' && (
        <div>
          <h3>DOCX: {documentUrl.split('/').pop()}</h3>
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(documentUrl)}&embedded=true`}
            width="100%"
            height="500px"
            title={`DOCX Viewer - ${documentUrl}`}
          />

          {/* <iframe
            src="http://localhost:3966/api/v1/upload/files/630f52f5b8928cc6e7aea0c396d1f698.pdf"
            width="100%"
            height="700px"
            title="PDF preview"
          /> */}

          <p>
            Lưu ý: DOCX hiển thị qua Google Viewer. Đảm bảo đường dẫn là URL công khai nếu dùng cách này.
          </p>
        </div>
      )}
    </div>
  );
};

export default DocViewerComponent;