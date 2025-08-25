// src/components/Metrics.tsx
import { useState, useEffect } from "react";

const Metrics = () => {
  // Valores finales
  const targets = {
    students: 1200,
    years:    10,
    courses:  35,
  };

  // Estados animados
  const [students, setStudents] = useState(0);
  const [years,    setYears]    = useState(0);
  const [courses,  setCourses]  = useState(0);

  useEffect(() => {
    const duration = 1500; // ms
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setStudents(Math.floor(t * targets.students));
      setYears   (Math.floor(t * targets.years));
      setCourses (Math.floor(t * targets.courses));
      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, []);

  return (
    <section id="metrics" className="py-16 bg-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-around text-center">
        <div>
          <div className="text-5xl font-bold text-primary">{students}+</div>
          <div className="mt-1 text-gray-600">Alumnos formados</div>
        </div>
        <div>
          <div className="text-5xl font-bold text-primary">{years}+</div>
          <div className="mt-1 text-gray-600">Años de experiencia</div>
        </div>
        <div>
          <div className="text-5xl font-bold text-primary">{courses}+</div>
          <div className="mt-1 text-gray-600">Cursos impartidos</div>
        </div>
      </div>
    </section>
  );
};

export default Metrics;
