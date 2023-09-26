// Shape of a notification object
export default interface Notification {
  email: string;
  body: string;
}

// Type guard for a notification object
export function isNotification(o: unknown): o is Notification {
  return (
    ((o as Notification)?.email !== undefined &&
      typeof (o as Notification).email === "string") &&
    ((o as Notification)?.body !== undefined &&
      typeof (o as Notification).body === "string")
  );
}
