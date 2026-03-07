(function fakeApiBootstrap() {
  const periods = [
    { id: "7d", label: "15 Feb - 22Feb (7 days)" },
    { id: "14d", label: "09 Feb - 22Feb (14 days)" },
    { id: "30d", label: "24 Jan - 22Feb (30 days)" }
  ];

  const database = {
    "7d": {
      summaryKpis: [
        { key: "totalActiveTickets", label: "Total Active Tickets", value: 1426 },
        { key: "activeAssignedTickets", label: "Active Assigned Tickets", value: 425 },
        { key: "shareOfActiveAssigned", label: "Share of Active Assigned", value: "29.8%" },
        { key: "activeEmergencyTickets", label: "Active Emergency Tickets", value: 3 },
        { key: "activeVipTickets", label: "Active VIP Tickets", value: 23 },
        { key: "activeEscalatedTickets", label: "Active Escalated Tickets", value: 4 }
      ],
      charts: {
        priority: [
          { label: "Standard", value: 413 },
          { label: "VIP", value: 183 },
          { label: "Escalated", value: 124 },
          { label: "Emergency", value: 79 },
          { label: "On Hold", value: 18 }
        ],
        status: [
          { label: "New", value: 85 },
          { label: "Unscheduled", value: 72 },
          { label: "Scheduled", value: 234 },
          { label: "Rescheduled", value: 23 },
          { label: "In Progress", value: 10 }
        ],
        aging: [
          { label: "0 - 2 days", value: 93 },
          { label: "3 - 7 days", value: 212 },
          { label: "8 - 15 days", value: 42 },
          { label: "15 - 30 days", value: 95 },
          { label: "31 - 60 days", value: 26 },
          { label: "61 - 90 days", value: 17 },
          { label: "> 90 days", value: 12 }
        ]
      },
      buildupKpis: [
        { key: "overdueTickets", label: "Overdue Tickets", value: 1426, delta: 2.7 },
        { key: "netTicketFlow", label: "Net Ticket Flow", value: 425, delta: -1.2 },
        { key: "avgDailyNetFlow", label: "Avg. Daily Net Flow", value: 5.6, delta: 0.8 }
      ],
      cardSummaries: {
        priority: [
          { value: 817, label: "Total" },
          { value: 5, label: "Types" }
        ],
        status: [
          { value: 424, label: "Total" },
          { value: 5, label: "States" }
        ],
        aging: [
          { value: 497, label: "Total" },
          { value: 7, label: "Buckets" }
        ],
        buildup: [
          { value: 1426, label: "Overdue" },
          { value: 425, label: "Net Flow" }
        ]
      }
    },
    "14d": {
      summaryKpis: [
        { key: "totalActiveTickets", label: "Total Active Tickets", value: 1888 },
        { key: "activeAssignedTickets", label: "Active Assigned Tickets", value: 602 },
        { key: "shareOfActiveAssigned", label: "Share of Active Assigned", value: "31.9%" },
        { key: "activeEmergencyTickets", label: "Active Emergency Tickets", value: 5 },
        { key: "activeVipTickets", label: "Active VIP Tickets", value: 27 },
        { key: "activeEscalatedTickets", label: "Active Escalated Tickets", value: 7 }
      ],
      charts: {
        priority: [
          { label: "Standard", value: 505 },
          { label: "VIP", value: 220 },
          { label: "Escalated", value: 160 },
          { label: "Emergency", value: 99 },
          { label: "On Hold", value: 28 }
        ],
        status: [
          { label: "New", value: 101 },
          { label: "Unscheduled", value: 85 },
          { label: "Scheduled", value: 299 },
          { label: "Rescheduled", value: 31 },
          { label: "In Progress", value: 18 }
        ],
        aging: [
          { label: "0 - 2 days", value: 118 },
          { label: "3 - 7 days", value: 285 },
          { label: "8 - 15 days", value: 59 },
          { label: "15 - 30 days", value: 121 },
          { label: "31 - 60 days", value: 36 },
          { label: "61 - 90 days", value: 22 },
          { label: "> 90 days", value: 16 }
        ]
      },
      buildupKpis: [
        { key: "overdueTickets", label: "Overdue Tickets", value: 1888, delta: 3.4 },
        { key: "netTicketFlow", label: "Net Ticket Flow", value: 602, delta: -0.7 },
        { key: "avgDailyNetFlow", label: "Avg. Daily Net Flow", value: 7.1, delta: 1.3 }
      ],
      cardSummaries: {
        priority: [
          { value: 1012, label: "Total" },
          { value: 5, label: "Types" }
        ],
        status: [
          { value: 534, label: "Total" },
          { value: 5, label: "States" }
        ],
        aging: [
          { value: 657, label: "Total" },
          { value: 7, label: "Buckets" }
        ],
        buildup: [
          { value: 1888, label: "Overdue" },
          { value: 602, label: "Net Flow" }
        ]
      }
    },
    "30d": {
      summaryKpis: [
        { key: "totalActiveTickets", label: "Total Active Tickets", value: 2715 },
        { key: "activeAssignedTickets", label: "Active Assigned Tickets", value: 811 },
        { key: "shareOfActiveAssigned", label: "Share of Active Assigned", value: "29.9%" },
        { key: "activeEmergencyTickets", label: "Active Emergency Tickets", value: 8 },
        { key: "activeVipTickets", label: "Active VIP Tickets", value: 49 },
        { key: "activeEscalatedTickets", label: "Active Escalated Tickets", value: 11 }
      ],
      charts: {
        priority: [
          { label: "Standard", value: 721 },
          { label: "VIP", value: 331 },
          { label: "Escalated", value: 210 },
          { label: "Emergency", value: 133 },
          { label: "On Hold", value: 40 }
        ],
        status: [
          { label: "New", value: 164 },
          { label: "Unscheduled", value: 130 },
          { label: "Scheduled", value: 402 },
          { label: "Rescheduled", value: 63 },
          { label: "In Progress", value: 30 }
        ],
        aging: [
          { label: "0 - 2 days", value: 150 },
          { label: "3 - 7 days", value: 403 },
          { label: "8 - 15 days", value: 100 },
          { label: "15 - 30 days", value: 170 },
          { label: "31 - 60 days", value: 52 },
          { label: "61 - 90 days", value: 39 },
          { label: "> 90 days", value: 25 }
        ]
      },
      buildupKpis: [
        { key: "overdueTickets", label: "Overdue Tickets", value: 2715, delta: 4.1 },
        { key: "netTicketFlow", label: "Net Ticket Flow", value: 811, delta: -0.3 },
        { key: "avgDailyNetFlow", label: "Avg. Daily Net Flow", value: 8.5, delta: 1.9 }
      ],
      cardSummaries: {
        priority: [
          { value: 1435, label: "Total" },
          { value: 5, label: "Types" }
        ],
        status: [
          { value: 789, label: "Total" },
          { value: 5, label: "States" }
        ],
        aging: [
          { value: 939, label: "Total" },
          { value: 7, label: "Buckets" }
        ],
        buildup: [
          { value: 2715, label: "Overdue" },
          { value: 811, label: "Net Flow" }
        ]
      }
    }
  };

  const realFetch = window.fetch.bind(window);

  window.fetch = function patchedFetch(input, init) {
    const requestUrl = typeof input === "string" ? input : input.url;
    const parsedUrl = new URL(requestUrl, window.location.href);

    if (parsedUrl.pathname !== "/api/workload-summary") {
      return realFetch(input, init);
    }

    const period = parsedUrl.searchParams.get("period") || "7d";
    const selectedPeriodId = database[period] ? period : "7d";
    const selectedRecord = database[selectedPeriodId];
    const payload = {
      periods,
      selectedPeriodId,
      ...selectedRecord,
      cardSummaries: buildCardSummaries(selectedRecord)
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          new Response(JSON.stringify(payload), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          })
        );
      }, 350);
    });
  };

  function buildCardSummaries(record) {
    const priorityTop = getTopRow(record.charts.priority);
    const statusTop = getTopRow(record.charts.status);
    const agingTop = getTopRow(record.charts.aging);

    return {
      priority: [
        { id: "priority_total", value: sumRows(record.charts.priority), label: "Total" },
        {
          id: "priority_top",
          value: priorityTop.value,
          label: "Top: " + priorityTop.label,
          targetLabel: priorityTop.label
        }
      ],
      status: [
        { id: "status_total", value: sumRows(record.charts.status), label: "Total" },
        {
          id: "status_top",
          value: statusTop.value,
          label: "Top: " + statusTop.label,
          targetLabel: statusTop.label
        }
      ],
      aging: [
        { id: "aging_total", value: sumRows(record.charts.aging), label: "Total" },
        {
          id: "aging_top",
          value: agingTop.value,
          label: "Top: " + agingTop.label,
          targetLabel: agingTop.label
        }
      ],
      buildup: [
        { id: "overdueTickets", value: getKpiValue(record.buildupKpis, "overdueTickets"), label: "Overdue" },
        { id: "netTicketFlow", value: getKpiValue(record.buildupKpis, "netTicketFlow"), label: "Net Flow" }
      ]
    };
  }

  function getTopRow(rows) {
    return rows.reduce((top, row) => (row.value > top.value ? row : top), rows[0]);
  }

  function sumRows(rows) {
    return rows.reduce((sum, row) => sum + Number(row.value || 0), 0);
  }

  function getKpiValue(kpis, key) {
    const match = kpis.find((kpi) => kpi.key === key);
    return match ? match.value : 0;
  }
})();
