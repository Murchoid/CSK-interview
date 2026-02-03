import {
  createAnnouncement as addAnnouncement,
  getAnnouncements as getAllAnnouncements,
  getAnnouncementById,
  deleteAnnouncement as removeAnnouncement,
} from '../models/announcements.model.js';

export const createAnnouncement = async(req, res) => {
  try {
    const { title, description, path, text } = req.body;

    if (!title || !description || !path || !text) {
      return res.status(400).json({
        error: 'All fields are required',
      });
    }

    const announcement = {
      id:crypto.randomUUID(),
      title,
      description,
      link: {
        path, text
      },
      createdAt: new Date().toLocaleDateString()
    }
    const result = await addAnnouncement(announcement);
    res.status(201).json({message:result.message,announcement});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAnnouncements = async(req, res) => {
  try {
    const result = await getAllAnnouncements();
    res.json({message: result.message, announcements:result?.announcements});
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
