import React, { createContext, useState, useContext, useEffect } from 'react';  

const ThemeContext = createContext(); // bikin context

export const useTheme = () => useContext(ThemeContext); // bikin hook buat akses nilai tema biar mudah akses di komponen lain //Re-render: Komponen yang menggunakan useContext akan selalu di-render ulang ketika nilai context berubah.

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); //  state ini buat nampung nilai tema

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme'); // ambil nilai tema yang disimmpan di local browse dengan kata kunci "Theme" ,  nilai yang di ambil disimpan dalam variabel savedTheme
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []); // ini untuk periksa localstorage buat nampung nilai tema

  const toggleTheme = () => { // ini untuk triggred tema kalo di click yaa dari dark ke light atau sebaliknya
    // console.log('Toggle theme called'); // test fungsi toglle nya jalan apa tidak

    setIsDarkMode(prevMode => { // ini fungsi untuk mengubah state isDarkMode ( nilai dari prevMode adalah nilai sebelum nya dari isDarkMode)
      const newMode = !prevMode; // membalikkan nilai yang sebelum nya true jadi false begitupula sebaliknya
    //   console.log('New theme:', newMode ? 'dark' : 'light');
      localStorage.setItem('theme', newMode ? 'dark' : 'light'); // => simpan ke local , jika newMode true  simpan dark, kalau false ya simpen light
      document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light'); // mengubah tampilan di CSS berdasarkan tema
      return newMode;
    });
  };
  
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/*## catatan 
### <ThemeContext.Provider>
Provider ini digunakan untuk menyediakan nilai context ke semua komponen anak di bawahnya dalam pohon komponen.

### value={{ isDarkMode, toggleTheme }}
 Nilai ini tersedia untuk semua komponen yang menggunakan context ini. Di sini ada hal:
isDarkMode: State yang menunjukkan apakah tema gelap sedang aktif atau tidak.
toggleTheme: Fungsi untuk mengganti tema.

### {children}: prop khusus di React merujuk pada semua komponen anak yang ditempatkan di dalam ThemeProvider saat digunakan.
 memungkinkan ThemeProvider untuk membungkus komponen lain dan menyediakan context ke mereka.
ringkasan : kode ini membungkus semua komponen anak (children) dengan ThemeContext.Provider, 
kasi akses ke isDarkMode dan toggleTheme ke semua komponen yang berada di dalam ThemeProvider.

*/