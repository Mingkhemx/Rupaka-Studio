import { useState } from 'react';
import { Phone, Edit2, Check } from 'lucide-react';

export default function ChatManager() {
  const [waNumber, setWaNumber] = useState(localStorage.getItem('waNumber') || '085604323512');
  const [isEditing, setIsEditing] = useState(false);
  const [tempNumber, setTempNumber] = useState(waNumber);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!tempNumber) {
      alert('Nomor WhatsApp tidak boleh kosong');
      return;
    }

    localStorage.setItem('waNumber', tempNumber);
    setWaNumber(tempNumber);
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setTempNumber(waNumber);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h3 className="font-display text-xl font-bold text-text-dark">Pengaturan WhatsApp</h3>
        <p className="font-body text-sm text-muted-grey mt-1">Kelola nomor WhatsApp yang ditampilkan di website</p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-[16px] p-4 flex items-center gap-3">
          <Check size={20} className="text-green-600" />
          <p className="font-body text-sm text-green-700">Nomor WhatsApp berhasil diperbarui!</p>
        </div>
      )}

      {/* WhatsApp Number Card */}
      <div className="bg-white border border-line-grey/20 rounded-[20px] p-8 max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Phone size={24} className="text-green-600" />
          </div>
          <div>
            <p className="font-body text-sm text-muted-grey">Nomor WhatsApp Aktif</p>
            <h4 className="font-display text-lg font-bold text-text-dark">WhatsApp Business</h4>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="font-display text-sm font-bold text-text-dark mb-2 block">Nomor WhatsApp</label>
              <input
                type="text"
                value={tempNumber}
                onChange={(e) => setTempNumber(e.target.value.replace(/\D/g, ''))}
                className="w-full border border-line-grey/40 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-primary-dark"
                placeholder="085604323512"
              />
              <p className="font-body text-xs text-muted-grey mt-2">
                Gunakan format: 08XXXXXXXXXX atau 62XXXXXXXXXX
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 bg-line-grey/20 text-text-dark hover:bg-line-grey/30 font-body py-2 rounded-lg transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="flex-1 bg-primary-dark text-white hover:bg-primary-blue font-body py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Check size={18} />
                Simpan
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-primary-dark/5 rounded-lg p-4 mb-4">
              <p className="font-display text-2xl font-bold text-primary-dark">{waNumber}</p>
              <p className="font-body text-xs text-muted-grey mt-2">
                Format: {waNumber.startsWith('0') ? 'Indonesia (0...)' : 'Internasional (62...)'}
              </p>
            </div>

            <button
              onClick={() => {
                setTempNumber(waNumber);
                setIsEditing(true);
              }}
              className="w-full bg-primary-dark text-white hover:bg-primary-blue font-body py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Edit2 size={18} />
              Ubah Nomor
            </button>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-[16px] p-6 max-w-md">
        <h5 className="font-display font-bold text-blue-900 mb-3">Informasi:</h5>
        <ul className="font-body text-sm text-blue-800 space-y-2 list-disc list-inside">
          <li>Nomor ini akan ditampilkan di semua tombol WhatsApp</li>
          <li>Format dapat diubah sesuai kebutuhan</li>
          <li>Perubahan akan langsung berlaku di website</li>
        </ul>
      </div>
    </div>
  );
}
