import {
  createAnnouncement as addAnnouncement,
  getAnnouncements as getAllAnnouncements,
  getAnnouncementById,
  deleteAnnouncement as removeAnnouncement,
} from './announcements.model.js';

export const createAnnouncement = (req, res) => {
  try {
    const { title, message } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        error: 'Title and message are required',
      });
    }

    const announcement = addAnnouncement(title, message);
    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAnnouncements = (req, res) => {
  try {
    const announcements = getAllAnnouncements();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAnnouncement = (req, res) => {
  try {
    const { id } = req.params;
    const announcement = getAnnouncementById(id);

    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    res.json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAnnouncement = (req, res) => {
  try {
    const { id } = req.params;
    const announcement = removeAnnouncement(id);

    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    res.json({ message: 'Announcement deleted', announcement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
