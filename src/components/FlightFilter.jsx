import React from 'react';

export default function FlightFilter({
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
}) {
    return (
        <div className="filter-bar">
            <div className="form-group">
                <label htmlFor="search">
                    Пошук рейсу або напрямку:
                    <input
                        type="text"
                        id="search"
                        className="form-input"
                        placeholder="Наприклад: Варшава або BA-102"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="status-select">
                    Статус:
                    <select
                        id="status-select"
                        className="form-input"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">Усі статуси</option>
                        <option value="on-time">Вчасно</option>
                        <option value="delayed">Затримується</option>
                    </select>
                </label>
            </div>
        </div>
    );
}
