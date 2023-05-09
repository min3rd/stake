const { Schema } = require("mongoose");
const { publicMongoose } = require("../config/publicMongoose");

const NotificationSchema = new Schema({
    userId: { type: String, require: true, index: true, },
    icon: { type: String },
    title: { type: String },
    description: { type: String },
    data: { type: Schema.Types.Mixed, default: {}, },
    time: { type: Date, default: new Date() },
    read: { type: Boolean, default: false, },
    link: { type: String, },
    useRouter: { type: Boolean, },
});
const Notification = publicMongoose.model('Notification', NotificationSchema);
module.exports = Notification;