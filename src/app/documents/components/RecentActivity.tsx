export function RecentActivity() {
  const activities = [
    {
      type: 'upload',
      name: 'Invoice_2023.pdf',
      time: '10 minutes ago',
      icon: 'fas fa-cloud-upload-alt'
    },
    {
      type: 'download',
      name: 'Contract_2023.docx',
      time: '1 hour ago',
      icon: 'fas fa-download'
    },
    {
      type: 'share',
      name: 'Report_2023.xlsx',
      time: '2 hours ago',
      icon: 'fas fa-share'
    }
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent text-white">
            <i className={activity.icon} className="text-lg"></i>
          </div>
          <div>
            <p className="text-foreground font-medium">{activity.name}</p>
            <p className="text-foreground/60 text-sm">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
