import { shareOptions } from '../data/music';

interface ShareModalProps {
  title: string;
  onSelect: (channel: string) => void;
  onClose: () => void;
}

export function ShareModal({ title, onSelect, onClose }: ShareModalProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h3>Share {title}</h3>
          <button className="text-button" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="share-grid">
          {shareOptions.map((option) => (
            <button key={option} className="share-option" onClick={() => onSelect(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
