import React from 'react';
export default function FormStatus({ status }) {
  if (!status) return null;
  return <div className={`form-status ${status.type}`} role="status">{status.message}</div>;
}
